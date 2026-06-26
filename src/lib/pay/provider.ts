// 支付提供商抽象层
// 目前用 Payjs，以后可以替换为微信官方/支付宝/Stripe 等

export interface PaymentOrder {
  orderId: string;       // 我方订单号
  amount: number;        // 金额（分）
  productName: string;   // 产品名称
}

export interface PaymentResult {
  success: boolean;
  payjsOrderId?: string; // Payjs 返回的订单号
  payUrl?: string;       // 付款链接
  qrCode?: string;       // 二维码 base64
  error?: string;
}

export interface WebhookData {
  payjsOrderId: string;  // Payjs 订单号
  amount: number;        // 实付金额（分）
  sign: string;          // 签名
  rawData: Record<string, unknown>; // Payjs 回调原始数据（含全部字段）
}

export interface PaymentProvider {
  name: string;

  // 创建支付订单
  createOrder(order: PaymentOrder): Promise<PaymentResult>;

  // 验证回调签名（使用回调的原始数据）
  verifyWebhook(data: WebhookData): boolean;

  // 查询订单状态（可选，用于轮询）
  queryOrder?(payjsOrderId: string): Promise<{ paid: boolean }>;
}
