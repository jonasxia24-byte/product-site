// Payjs 支付实现
// 文档: https://help.payjs.cn/

import crypto from "crypto";
import type { PaymentProvider, PaymentOrder, PaymentResult, WebhookData } from "./provider";

export class PayjsProvider implements PaymentProvider {
  name = "payjs";
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl = "https://payjs.cn/api") {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  // 生成签名（Payjs 规则：key 排序 → key=value 拼接 → 尾部追加 &key=API_KEY → MD5 大写）
  private sign(params: Record<string, unknown>): string {
    const sorted = Object.keys(params)
      .filter((k) => params[k] !== undefined && params[k] !== "" && k !== "sign")
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join("&");

    return crypto
      .createHash("md5")
      .update(sorted + "&key=" + this.apiKey)
      .digest("hex")
      .toUpperCase();
  }

  // 创建支付订单
  async createOrder(order: PaymentOrder): Promise<PaymentResult> {
    try {
      const params: Record<string, unknown> = {
        mchid: this.getMchId(),
        total_fee: order.amount, // Payjs 用分
        out_trade_no: order.orderId,
        body: order.productName,
        notify_url: this.getNotifyUrl(),
      };

      params.sign = this.sign(params);

      const response = await fetch(`${this.apiUrl}/native`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (data.return_code === 1) {
        return {
          success: true,
          payjsOrderId: data.payjs_order_id,
          qrCode: data.qrcode, // 二维码 base64
          payUrl: data.url,
        };
      }

      return { success: false, error: data.return_msg || "支付创建失败" };
    } catch (err) {
      return { success: false, error: String(err) };
    }
  }

  // 验证回调签名
  // 使用 Payjs 回调的原始数据（snake_case 字段名）计算签名，避免字段名映射错误
  verifyWebhook(data: WebhookData): boolean {
    // 从 rawData 中提取 Payjs 返回的全部字段（不含 sign），用原字段名计算签名
    const raw = data.rawData;
    const params: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(raw)) {
      if (key === "sign") continue;
      if (value === undefined || value === "") continue;
      params[key] = value;
    }

    const expectedSign = this.sign(params);
    return data.sign === expectedSign;
  }

  // 查询订单状态
  async queryOrder(payjsOrderId: string): Promise<{ paid: boolean }> {
    try {
      const params: Record<string, unknown> = {
        payjs_order_id: payjsOrderId,
      };
      params.sign = this.sign(params);

      const response = await fetch(`${this.apiUrl}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      return { paid: data.status === 1 };
    } catch {
      return { paid: false };
    }
  }

  // 从环境变量获取商户号
  private getMchId(): string {
    return process.env.PAYJS_MCHID || "";
  }

  // 获取回调地址
  private getNotifyUrl(): string {
    return process.env.NOTIFY_URL || "";
  }
}
