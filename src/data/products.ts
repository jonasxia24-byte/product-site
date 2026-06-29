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
    name: "产品名称1",
    subtitle: "一句话说清楚这个产品是什么",
    description:
      "这里是详细的产品介绍，说清楚这个资料包含什么内容、有什么价值、能帮用户解决什么问题。\n\n可以分多段写，每段讲一个重点。比如第一段讲产品是什么，第二段讲有什么价值，第三段讲怎么使用。\n\n建议 200-500 字，让用户看完能判断适不适合自己。",
    price: 99,
    image: "/products/placeholder.png",
    tag: "热门",
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
