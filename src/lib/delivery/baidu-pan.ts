// 百度网盘交付

import type { DeliveryProvider, DeliveryResult } from "./provider";

export class BaiduPanDelivery implements DeliveryProvider {
  type = "baidu_pan" as const;

  getDeliveryContent(config: string): DeliveryResult {
    try {
      const data = JSON.parse(config);
      if (!data.url) {
        return { success: false, content: {}, error: "缺少网盘链接" };
      }
      return {
        success: true,
        content: {
          url: data.url,
          extraction_code: data.extraction_code || undefined,
        },
      };
    } catch {
      return { success: false, content: {}, error: "配置格式错误" };
    }
  }

  validateConfig(config: string): { valid: boolean; error?: string } {
    try {
      const data = JSON.parse(config);
      if (!data.url) return { valid: false, error: "缺少 url 字段" };
      if (!data.url.includes("pan.baidu.com"))
        return { valid: false, error: "不是百度网盘链接" };
      return { valid: true };
    } catch {
      return { valid: false, error: "JSON 格式错误" };
    }
  }

  // 百度网盘是公开链接，撤销交付需配合后续的 DownloadToken 机制
  async revoke(_config: string): Promise<{ success: boolean; error?: string }> {
    return { success: true };
  }
}
