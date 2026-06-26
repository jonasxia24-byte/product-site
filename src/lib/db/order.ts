// 订单数据库操作（Cloudflare D1）- V3.0 数字商品平台

import { getDeliveryProvider } from "@/lib/delivery/registry";
import type { DeliveryContent, DeliveryType } from "@/lib/delivery/provider";

// ============================================================
// 类型定义
// ============================================================

export interface Order {
  id: string;
  product_id: string;
  product_name: string;      // 下单时商品名称（快照）
  product_price: number;     // 下单时商品价格/分（快照）
  product_version: string;   // 下单时商品版本（快照）
  amount: number;
  status: "pending" | "paid" | "delivered" | "completed" | "refund" | "closed" | "expired";
  payjs_order_id: string | null;
  customer_contact: string | null;
  paid_at: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  delivery_type: DeliveryType;
  tag: string | null;
  disabled: number;
}

export interface Asset {
  id: string;
  product_id: string;
  name: string;
  delivery_type: DeliveryType;
  delivery_content: string; // JSON
}

export interface Delivery {
  id: string;
  order_id: string;
  asset_id: string;
  delivery_type: DeliveryType;
  delivery_content: string; // JSON
  status: "pending" | "delivered" | "failed";
  delivered_at: string | null;
  created_at: string;
}

// ============================================================
// 订单操作
// ============================================================

// 生成订单号：ORD-20260626-XXXXX
export function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${date}-${random}`;
}

// 创建订单（含商品快照）
export async function createOrder(
  db: D1Database,
  productId: string,
  productName: string,
  productPrice: number,
  amount: number,
  productVersion = "v1"
): Promise<Order> {
  const orderId = generateOrderId();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO orders (id, product_id, product_name, product_price, product_version, amount, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
    )
    .bind(orderId, productId, productName, productPrice, productVersion, amount, now, now)
    .run();

  return {
    id: orderId,
    product_id: productId,
    product_name: productName,
    product_price: productPrice,
    product_version: productVersion,
    amount,
    status: "pending",
    payjs_order_id: null,
    customer_contact: null,
    paid_at: null,
    delivered_at: null,
    created_at: now,
    updated_at: now,
  };
}

// 更新订单 Payjs 订单号
export async function updateOrderPayjsId(
  db: D1Database,
  orderId: string,
  payjsOrderId: string
): Promise<void> {
  await db
    .prepare(`UPDATE orders SET payjs_order_id = ?, updated_at = ? WHERE id = ?`)
    .bind(payjsOrderId, new Date().toISOString(), orderId)
    .run();
}

// 标记订单已付款（带幂等检查和金额验证）
export async function markOrderPaid(
  db: D1Database,
  payjsOrderId: string,
  paidAmount: number
): Promise<{ success: boolean; order?: Order; reason?: string }> {
  const order = await db
    .prepare(`SELECT * FROM orders WHERE payjs_order_id = ?`)
    .bind(payjsOrderId)
    .first<Order>();

  if (!order) return { success: false, reason: "订单不存在" };

  // 幂等：已付款直接返回
  if (order.status === "paid" || order.status === "delivered" || order.status === "completed") {
    return { success: true, order };
  }

  if (order.status !== "pending") {
    return { success: false, reason: `订单状态异常: ${order.status}` };
  }

  // 金额校验
  if (order.amount !== paidAmount) {
    return { success: false, reason: "金额不匹配" };
  }

  const now = new Date().toISOString();
  await db
    .prepare(`UPDATE orders SET status = 'paid', paid_at = ?, updated_at = ? WHERE id = ?`)
    .bind(now, now, order.id)
    .run();

  return { success: true, order: { ...order, status: "paid", paid_at: now } };
}

// 查询订单状态
export async function getOrderStatus(
  db: D1Database,
  orderId: string
): Promise<Order | null> {
  return await db
    .prepare(`SELECT * FROM orders WHERE id = ?`)
    .bind(orderId)
    .first<Order>();
}

// ============================================================
// 交付操作
// ============================================================

// 获取订单的交付内容（核心逻辑）
export async function getOrderDelivery(
  db: D1Database,
  orderId: string
): Promise<{ success: boolean; deliveries?: DeliveryContent[]; error?: string }> {
  // 1. 验证订单状态
  const order = await db
    .prepare(`SELECT * FROM orders WHERE id = ? AND status IN ('paid', 'delivered', 'completed')`)
    .bind(orderId)
    .first<Order>();

  if (!order) {
    return { success: false, error: "订单不存在或未付款" };
  }

  // 2. 获取产品信息
  const product = await db
    .prepare(`SELECT * FROM products WHERE id = ?`)
    .bind(order.product_id)
    .first<Product>();

  if (!product) {
    return { success: false, error: "产品不存在" };
  }

  // 3. 获取该产品的所有资产
  const assetsResult = await db
    .prepare(`SELECT * FROM assets WHERE product_id = ?`)
    .bind(order.product_id)
    .all();

  const assets = (assetsResult.results || []) as unknown as Asset[];

  if (assets.length === 0) {
    // 没有资产，使用产品级别的交付方式
    const provider = getDeliveryProvider(product.delivery_type);
    // 需要从某处获取产品级别的交付配置...这里简化处理
    return { success: false, error: "产品未配置交付资产" };
  }

  // 4. 逐个资产生成交付内容
  const deliveries: DeliveryContent[] = [];

  for (const asset of assets) {
    const provider = getDeliveryProvider(asset.delivery_type);
    const result = provider.getDeliveryContent(asset.delivery_content);

    if (result.success) {
      deliveries.push(result.content);

      // 记录交付
      const deliveryId = `DLV-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();

      await db
        .prepare(
          `INSERT INTO deliveries (id, order_id, asset_id, delivery_type, delivery_content, status, delivered_at, created_at)
           VALUES (?, ?, ?, ?, ?, 'delivered', ?, ?)`
        )
        .bind(deliveryId, orderId, asset.id, asset.delivery_type, JSON.stringify(result.content), now, now)
        .run();
    }
  }

  // 5. 更新订单状态为已交付
  if (deliveries.length > 0) {
    const now = new Date().toISOString();
    await db
      .prepare(`UPDATE orders SET status = 'delivered', delivered_at = ?, updated_at = ? WHERE id = ?`)
      .bind(now, now, orderId)
      .run();
  }

  return { success: true, deliveries };
}

// ============================================================
// 过期处理
// ============================================================

export async function expireOldOrders(db: D1Database): Promise<number> {
  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const result = await db
    .prepare(
      `UPDATE orders SET status = 'expired', updated_at = ? WHERE status = 'pending' AND created_at < ?`
    )
    .bind(new Date().toISOString(), cutoff)
    .run();
  return result.meta?.changes || 0;
}
