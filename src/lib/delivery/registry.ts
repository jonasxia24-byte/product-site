// 交付方式注册表
// 新增交付方式只需：1. 实现 DeliveryProvider  2. 在这里注册

import type { DeliveryProvider, DeliveryType } from "./provider";
import { BaiduPanDelivery } from "./baidu-pan";
import { PlainTextDelivery } from "./plain-text";
import { UrlDelivery } from "./url-delivery";

const providers: Record<DeliveryType, DeliveryProvider> = {
  baidu_pan: new BaiduPanDelivery(),
  plain_text: new PlainTextDelivery(),
  url: new UrlDelivery(),
  api_key: new PlainTextDelivery(),   // 复用纯文本，后续可独立实现
  github_repo: new UrlDelivery(),     // 复用链接，后续可独立实现
  manual: new PlainTextDelivery(),    // 复用纯文本，后续可独立实现
};

export function getDeliveryProvider(type: DeliveryType): DeliveryProvider {
  const provider = providers[type];
  if (!provider) {
    throw new Error(`未知的交付方式: ${type}`);
  }
  return provider;
}

export function getSupportedTypes(): DeliveryType[] {
  return Object.keys(providers) as DeliveryType[];
}
