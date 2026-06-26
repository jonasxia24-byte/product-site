// 纯文本交付（提示词、配置代码、模板等）

import type { DeliveryProvider, DeliveryResult } from "./provider";

export class PlainTextDelivery implements DeliveryProvider {
  type = "plain_text" as const;

  getDeliveryContent(config: string): DeliveryResult {
    try {
      const data = JSON.parse(config);
      if (!data.text) {
        return { success: false, content: {}, error: "缺少文本内容" };
      }
      return {
        success: true,
        content: { text: data.text },
      };
    } catch {
      return { success: false, content: {}, error: "配置格式错误" };
    }
  }

  validateConfig(config: string): { valid: boolean; error?: string } {
    try {
      const data = JSON.parse(config);
      if (!data.text) return { valid: false, error: "缺少 text 字段" };
      return { valid: true };
    } catch {
      return { valid: false, error: "JSON 格式错误" };
    }
  }

  async revoke(_config: string): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }
}
