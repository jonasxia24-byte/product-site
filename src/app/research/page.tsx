"use client";

import { researchArticles, researchCategories } from "@/data/research";
import Link from "next/link";
import { useState } from "react";

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? researchArticles.filter((a) => a.category === activeCategory)
    : researchArticles;

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <div className="mx-auto max-w-[1040px] px-6 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Header */}
        <p className="text-sm font-semibold text-[#6b7280] tracking-[0.15em] uppercase mb-4">Research</p>
        <h1 className="text-[2.4rem] md:text-[3.5rem] font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-4">
          研究文章
        </h1>
        <p className="text-lg text-[#6b7280] leading-relaxed mb-10">
          猫哥的原创交易研究，点击标题跳转至公众号阅读全文。
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              activeCategory === null
                ? "bg-[#111827] text-white"
                : "bg-white border border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
            }`}
          >
            全部
          </button>
          {researchCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
                activeCategory === cat.key
                  ? "bg-[#111827] text-white"
                  : "bg-white border border-[#e5e7eb] text-[#6b7280] hover:border-[#d1d5db]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Article List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#9ca3af] text-sm">暂无文章，敬请期待</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#d1d5db] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] rounded-md">
                        {researchCategories.find((c) => c.key === article.category)?.label || article.category}
                      </span>
                      {article.date && (
                        <span className="text-xs text-[#9ca3af]">{article.date}</span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-[#111827] group-hover:text-[#0ea5e9] transition-colors mb-1.5">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[#6b7280] leading-relaxed">{article.summary}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#d1d5db] group-hover:text-[#111827] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
