export interface ResearchArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  url: string;
  date?: string;
}

export const researchCategories = [
  { key: "技术", label: "技术分析" },
  { key: "心理", label: "交易心理" },
  { key: "系统", label: "交易系统" },
  { key: "复盘", label: "实盘复盘" },
];

export const researchArticles: ResearchArticle[] = [
  // ============================================
  // 👇 在这里添加你的研究文章
  // url 填公众号文章链接
  // ============================================
  // {
  //   id: "chanlun-basics",
  //   title: "缠论入门：同构笔的核心逻辑",
  //   summary: "一句话摘要",
  //   category: "技术",
  //   url: "https://mp.weixin.qq.com/s/xxxxx",
  //   date: "2026-07",
  // },
];
