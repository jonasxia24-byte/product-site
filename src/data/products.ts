export interface Product {
  id: string;
  name: string;          // 产品名称
  subtitle: string;      // 一句话概括
  description: string;   // 详细介绍（用 \n\n 分段）
  price: number;         // 价格（元）
  image: string;         // 产品图片路径，放 public/products/ 下
  tag?: string;          // 标签：热门/新品
  disabled?: boolean;    // 是否下架
}

// ============================================
// 👇 在这里修改你的产品列表
// 图片放 public/products/ 文件夹下
// ============================================

export const siteName = "三脚猫投资圈";
export const siteDesc = "点击查看详情，获取来自猫哥的专业内容，提升你的投资决策效率";

export const products: Product[] = [
  {
    id: "product-01",
    name: "零缠同构笔操盘图谱",
    subtitle: "50幅同构笔图+20幅关键博弈位图",
    description:
      "《零缠同构笔操盘图谱》是一套面向缠论学习者的实战图谱，共包含 70 张高清图：50 张同构笔图谱（25 张本级别案例 + 25 张跨级别验证图）与 20 张关键博弈位图谱。通过大量典型案例，帮助你彻底理解同构笔的画法、级别递归逻辑，以及如何利用高级别验证复杂走势，实现快速识图、精准判级。\n\n此外，图谱还融合 Price Action 理念，系统讲解关键博弈位的识别与应用，帮助你准确判断支撑、压力、止盈及止损位置，有效提升交易胜率与盈亏比。每张图均配有详细文字解析及实战技巧，适合作为零师体系与缠论学习的长期参考资料。\n\n详情请阅读：https://mp.weixin.qq.com/s/iP2IMLzmlACt0j2uk0byjg",
    price: 188,
    image: "/products/同构笔图谱.png",
    tag: "缠论工具",
  },
  {
    id: "product-02",
    name: "产品名称2",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。\n\n分段写，讲清楚产品内容和价值。",
    price: 199,
    image: "/products/placeholder.png",
  },
  {
    id: "product-03",
    name: "产品名称3",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 49,
    image: "/products/placeholder.png",
    tag: "新品",
  },
  {
    id: "product-04",
    name: "产品名称4",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 149,
    image: "/products/placeholder.png",
  },
  {
    id: "product-05",
    name: "产品名称5",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 79,
    image: "/products/placeholder.png",
  },
  {
    id: "product-06",
    name: "产品名称6",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 299,
    image: "/products/placeholder.png",
  },
  {
    id: "product-07",
    name: "产品名称7",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 59,
    image: "/products/placeholder.png",
  },
  {
    id: "product-08",
    name: "产品名称8",
    subtitle: "一句话说清楚这个产品是什么",
    description: "这里是详细的产品介绍。",
    price: 129,
    image: "/products/placeholder.png",
  },
  {
    id: "product-09",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.png",
    disabled: true,
  },
  {
    id: "product-10",
    name: "更多资料敬请期待",
    subtitle: "持续更新中",
    description: "新的金融资料会在这里上架，敬请期待。",
    price: 0,
    image: "/products/placeholder.png",
    disabled: true,
  },
];

// ============================================
// 联系方式（页脚显示）
// ============================================
export const contactInfo = {
  wechat: "Kxkkk2020",
};
