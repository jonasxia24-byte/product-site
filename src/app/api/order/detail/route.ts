// GET /api/order/detail?orderId=xxx
// 获取订单交付内容（支持多种交付方式）

import { NextRequest, NextResponse } from "next/server";
import { getOrderDelivery } from "@/lib/db/order";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "缺少订单号" }, { status: 400 });
    }

    const db = (request as unknown as { env: { DB: D1Database } }).env?.DB;
    const result = await getOrderDelivery(db, orderId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      deliveries: result.deliveries,
    });
  } catch (err) {
    console.error("Order detail error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
