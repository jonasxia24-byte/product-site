// POST /api/webhook
// Payjs 支付回调

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/db/order";
import { PayjsProvider } from "@/lib/pay/payjs";

export async function POST(request: NextRequest, context: { cloudflare: { env: { DB: D1Database; PAYJS_API_KEY: string; PAYJS_MCHID: string; NOTIFY_URL: string } } }) {
  try {
    const body = await request.json();

    // 提取回调数据
    const payjsOrderId = body.payjs_order_id;
    const amount = body.total_fee; // Payjs 回调的金额（分）
    const sign = body.sign;

    if (!payjsOrderId || !amount || !sign) {
      return NextResponse.json({ error: "参数不完整" }, { status: 400 });
    }

    // 验证签名
    const payjs = new PayjsProvider(context.cloudflare.env.PAYJS_API_KEY || "");
    const isValid = payjs.verifyWebhook({
      payjsOrderId,
      amount,
      sign,
      rawData: body,
    });

    if (!isValid) {
      console.error("Webhook 签名验证失败:", payjsOrderId);
      return NextResponse.json({ error: "签名验证失败" }, { status: 403 });
    }

    // 获取数据库
    const db = context.cloudflare.env.DB;

    // 标记订单已付款（带幂等检查和金额验证）
    const result = await markOrderPaid(db, payjsOrderId, amount);

    if (!result.success) {
      console.error("订单处理失败:", result.reason, payjsOrderId);
      return NextResponse.json(
        { error: result.reason },
        { status: 400 }
      );
    }

    console.log("订单已付款:", result.order?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
