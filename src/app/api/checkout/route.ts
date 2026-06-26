// POST /api/checkout
// 创建支付订单

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { createOrder, updateOrderPayjsId } from "@/lib/db/order";
import { PayjsProvider } from "@/lib/pay/payjs";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  try {
    // 限流：每分钟最多 10 次
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { allowed } = checkRateLimit(`checkout:${ip}`, 10, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "请求过于频繁，请稍后再试" },
        { status: 429 }
      );
    }

    // 解析请求
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "缺少产品ID" }, { status: 400 });
    }

    // 查找产品
    const product = products.find((p) => p.id === productId);
    if (!product || product.disabled) {
      return NextResponse.json({ error: "产品不存在或已下架" }, { status: 404 });
    }
    const priceInFen = product.price * 100; // 元 → 分（Payjs 使用分）

    // 获取 D1 数据库（Cloudflare 环境，@cloudflare/next-on-pages 会注入）
    const db = (request as unknown as { env: { DB: D1Database } }).env?.DB;

    // 创建内部订单（含商品快照）
    const order = await createOrder(db, productId, product.name, priceInFen, priceInFen);

    // 调用 Payjs 创建支付
    const payjs = new PayjsProvider(process.env.PAYJS_API_KEY || "");
    const result = await payjs.createOrder({
      orderId: order.id,
      amount: priceInFen,
      productName: product.name,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "支付创建失败" },
        { status: 500 }
      );
    }

    // 更新订单的 Payjs 订单号
    if (result.payjsOrderId) {
      await updateOrderPayjsId(db, order.id, result.payjsOrderId);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      qrCode: result.qrCode,
      payUrl: result.payUrl,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
