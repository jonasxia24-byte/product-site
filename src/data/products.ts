export type ProductCategory = "重点推荐" | "指标类" | "工具包" | "其他";

export interface Product {
  id: string;
  name: string;          // 产品名称
  subtitle: string;      // 一句话概括
  description: string;   // 详细介绍（用 \n\n 分段）
  price: number;         // 价格（元）
  image: string;         // 产品图片路径，放 public/products/ 下
  tag?: string;          // 标签：热门/新品
  category?: ProductCategory;  // 分类
  disabled?: boolean;    // 是否下架
  link?: string;         // 外部链接（Pro 工具等，有此字段则不链接到详情页）
}

// ============================================
// 👇 在这里修改你的产品列表
// 图片放 public/products/ 文件夹下
// ============================================

export const siteName = "TripawAlpha猫哥资源站";
export const siteDesc = "点击查看详情，获取来自猫哥的专业内容，提升你的投资决策效率";

export const products: Product[] = [
  // ⭐ 重点推荐
  {
    id: "product-pro",
    name: "零师 Pro 套餐",
    subtitle: "零师资料完整版 + 网页版缠论画笔辅助工具",
    description:
      `这是一套专为希望系统学习并高效应用零师同构笔体系打造的 Pro 学习方案，旨在帮助学习者建立”理论学习 + 实战辅助”的完整闭环，让同构笔真正应用到每天的复盘分析中。\n\n套餐包含《零师资料完整版》全部内容，并新增网页版同构笔辅助工具（每个用户会获得一个用户名和密码）。用户只需输入股票代码并选择对应周期，即可快速生成对应周期的同构笔结构，用于辅助学习、日常复盘以及验证自己的分析结果，大幅减少手工识别和反复确认所花费的时间。\n\n需要说明的是，网页版同构笔辅助工具是零师同构笔体系的数字化辅助工具，主要用于帮助学习者理解和应用同构笔结构，提高复盘效率，并不提供买卖点提示，也不构成任何投资建议。\n\n适合已经学习《零师资料》、希望进一步提升同构笔识别能力、减少复盘时间，并将同构笔体系应用到实际分析中的投资者。\n\nPro 套餐包含：\n\n《零师资料完整版》全部内容（价值199元）\n\n网页版同构笔辅助工具（Pro 专属权益）\n\n后续工具优化版本免费更新\n\n已购买《零师资料完整版》的用户，可补差价100元升级至 Pro 套餐。\n\n注意：网页版辅助工具建立在服务器基础上，猫哥需要每年支付服务器费用，理论上该辅助工具的服务年限为一年，截止2027年7月，到期后猫哥会通知。\n\n已购Pro套餐用户可直接访问登录：tool.tripawalpha.com`,
    price: 299,
    image: "/products/零师PRO.jpg",
    tag: "Pro 专享",
    category: "重点推荐",
    link: "https://tool.tripawalpha.com",
  },
  {
    id: "product-04",
    name: "零师缠论研习资料库",
    subtitle: "看零师才是学缠的最好出路，已售100+",
    description:
      "这是一套系统整理的零师缠论学习资料库，收录目前较完整的公开教学内容，帮助学习者快速获取优质学习资源，避免四处寻找零散资料，大幅降低学习成本。\n\n资料涵盖零师早期核心理论、2017年后的录音课程、实盘教学、学习笔记及进阶思路，并提供精华版与完整版两个版本，满足不同阶段学习需求。通过系统梳理零师从早期到后期的理念演变，帮助学习者更加深入地理解缠论体系与实战交易逻辑。\n\n产品提供精华整理版（约600-700页）及完整版（2.3GB）两种选择，邮箱交付，并包含猫哥缠论答疑服务及猫哥茶话会交流群权益。\n\n精华版 99 元，完整版 199 元，适合希望系统学习零师缠论体系、减少资料搜集时间并提升学习效率的投资者。\n\n详情请阅读：https://mp.weixin.qq.com/s/fsXZEaC5BgyjALn1twlO3w",
    price: 199,
    image: "/products/零师缠论研习资料库.jpg",
    tag: "热门",
    category: "重点推荐",
  },

  // 📈 指标类
  {
    id: "product-03",
    name: "波动猎手四代分时指标",
    subtitle: "猫哥自用的分时指标，开袋即食",
    description:
      "这是一套专为通达信用户打造的盘中分时交易辅助工具，旨在帮助投资者更加客观地把握盘中支撑、压力及做T机会，减少情绪化交易，提高交易效率。\n\n产品采用猫哥自主优化的不对称策略模型，结合上下轨波动区间与多维度算法，避免传统分时指标信号单一、钝化及未来函数等常见问题。同时附赠经典 R-Breaker 突破策略定制版指标，可用于识别趋势突破与反转机会，满足不同交易风格的需求。\n\n产品包含波动猎手四代分时主图指标、RB突破分时主图指标、分时做T答疑权益及猫哥茶话会入群权益，并提供安装指导与售后支持。\n\n售价 168 元，适合具备一定股票交易基础、希望提升盘中做T及短线交易效率的投资者。（仅支持通达信电脑版）\n\n详情请阅读：https://mp.weixin.qq.com/s/_FdK32nIwXCYzMlcKKECjg",
    price: 168,
    image: "/products/波动猎手四代分时指标.jpg",
    tag: "自用指标",
    category: "指标类",
  },

  // 🧰 工具包
  {
    id: "product-02",
    name: "「缠缠缠」初阶工具包",
    subtitle: "缠论初学者必备，少走弯路套餐",
    description:
      "这是一套专为缠论初学者打造的系统化学习工具包，旨在帮助新手避开碎片化学习和盲目摸索，建立完整、高效的缠论学习路径。\n\n课程整合了猫哥多年实战学习经验，精选缠论原文配图书籍、学习指标、优质学习资料及系统化学习路线，并配套一年答疑服务，帮助学习者从基础概念、笔、中枢、买卖点到指标辅助逐步建立完整的缠论框架，减少走弯路和重复试错的成本。\n\n产品包含两本全彩缠论原文配图书籍（不需要纸质书立减100元）、电脑版及手机版缠论指标、多套辅助资料和经典交易书籍等内容。购买工具包的朋友赠送零师全套学习资料包（价值199）。指标仅作为辅助工具，请勿作为实战使用，仅用于帮助在初期学缠论的时候更直观理解缠论笔、段、走势等基本部件。\n\n售价 799 元，适合零基础或刚接触缠论、希望系统入门并长期学习提升的投资者。\n\n详情请阅读：https://mp.weixin.qq.com/s/AyDXezrUt-NL_K0CqU6v-w",
    price: 799,
    image: "/products/缠缠缠初阶工具包.jpg",
    tag: "缠论工具包",
    category: "工具包",
  },
  {
    id: "product-01",
    name: "零缠同构笔操盘图谱",
    subtitle: "50幅同构笔图+20幅关键博弈位图",
    description:
      "《零缠同构笔操盘图谱》是一套面向缠论学习者的实战图谱，共包含 70 张高清图：50 张同构笔图谱（25 张本级别案例 + 25 张跨级别验证图）与 20 张关键博弈位图谱。通过大量典型案例，帮助你彻底理解同构笔的画法、级别递归逻辑，以及如何利用高级别验证复杂走势，实现快速识图、精准判级。\n\n此外，图谱还融合 Price Action 理念，系统讲解关键博弈位的识别与应用，帮助你准确判断支撑、压力、止盈及止损位置，有效提升交易胜率与盈亏比。每张图均配有详细文字解析及实战技巧，适合作为零师体系与缠论学习的长期参考资料。\n\n详情请阅读：https://mp.weixin.qq.com/s/iP2IMLzmlACt0j2uk0byjg",
    price: 188,
    image: "/products/同构笔图谱.jpg",
    tag: "缠论工具",
    category: "工具包",
  },

  // 📦 其他/占位
  {
    id: "product-05",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.svg",
    disabled: true,
    category: "其他",
  },
  {
    id: "product-06",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.svg",
    disabled: true,
    category: "其他",
  },
  {
    id: "product-07",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.svg",
    disabled: true,
    category: "其他",
  },
  {
    id: "product-08",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.svg",
    disabled: true,
    category: "其他",
  },
];

// ============================================
// 联系方式（页脚显示）
// ============================================
export const contactInfo = {
  wechat: "Kxkkk2020",
};
