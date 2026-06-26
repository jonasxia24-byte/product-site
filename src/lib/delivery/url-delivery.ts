// 链接交付（在线课程、GitHub 仓库、通用下载链接等）

import type { DeliveryProvider, DeliveryResult } from "./provider";

export class UrlDelivery implements DeliveryProvider {
  type = "url" as const;

  getDeliveryContent(config: string): DeliveryResult {
    try {
      const data = JSON.parse(config);

      // 单链接模式
      if (data.url) {
        return {
          success: true,
          content: {
            links: [{ name: data.name || "访问链接", url: data.url }],
          },
        };
      }

      // 多链接模式
      if (data.links && Array.isArray(data.links) && data.links.length > 0) {
        return {
          success: true,
          content: { links: data.links },
        };
      }

      return { success: false, content: {}, error: "缺少链接" };
    } catch {
      return { success: false, content: {}, error: "配置格式错误" };
    }
  }

  validateConfig(config: string): { valid: boolean; error?: string } {
    try {
      const data = JSON.parse(config);
      if (!data.url && !data.links) {
        return { valid: false, error: "需要 url 或 links 字段" };
      }
      return { valid: true };
    } catch {
      return { valid: false, error: "JSON 格式错误" };
    }
  }

  async revoke(_config: string): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }
}
