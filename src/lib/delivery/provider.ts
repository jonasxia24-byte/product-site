// ============================================================
// 交付层抽象
// 支持多种交付方式，后续扩展只需新增实现
// ============================================================

export type DeliveryType =
  | "baidu_pan"    // 百度网盘链接
  | "plain_text"   // 纯文本（如提示词、配置代码）
  | "url"          // 通用链接（如 GitHub、在线课程）
  | "api_key"      // API Key（一次性展示）
  | "github_repo"  // GitHub 仓库访问权限
  | "manual";      // 人工交付（如咨询服务）

// 交付内容结构（JSON 格式，存在 delivery_content 字段）
export interface DeliveryContent {
  // baidu_pan 类型
  url?: string;
  extraction_code?: string;  // 提取码

  // plain_text 类型
  text?: string;

  // url 类型
  links?: Array<{ name: string; url: string }>;

  // api_key 类型
  key?: string;
  expires_at?: string;

  // github_repo 类型
  repo?: string;
  access_token?: string;

  // manual 类型
  instructions?: string;
  contact?: string;
}

// 交付结果
export interface DeliveryResult {
  success: boolean;
  content: DeliveryContent;
  error?: string;
}

// 交付提供者接口
export interface DeliveryProvider {
  type: DeliveryType;

  // 获取交付内容（根据资产配置返回）
  getDeliveryContent(assetDeliveryContent: string): DeliveryResult;

  // 验证资产配置是否有效
  validateConfig(config: string): { valid: boolean; error?: string };

  // 撤销交付（退款/取消授权时调用，预留扩展）
  revoke(config: string): Promise<{ success: boolean; error?: string }>;
}
