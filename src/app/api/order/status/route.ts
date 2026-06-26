// GET /api/order/status?orderId=xxx
// 前端轮询订单状态

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getOrderStatus } from "@/lib/db/order";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "缺少订单号" }, { status: 400 });
    }

    // 获取数据库
    const db = (request as unknown as { env: { DB: D1Database } }).env?.DB;

    const order = await getOrderStatus(db, orderId);

    if (!order) {
      return NextResponse.json({ error: "订单不存在" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
      paidAt: order.paid_at,
    });
  } catch (err) {
    console.error("Order status error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
