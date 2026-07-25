"use client";

import { researchArticles } from "@/data/research";

export default function ResearchPage() {
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

        {/* Article List */}
        <div className="space-y-4">
          {researchArticles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#d1d5db] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[#111827] group-hover:text-[#0ea5e9] transition-colors mb-1.5">
                    {article.title}
                  </h2>
                </div>
                <svg className="w-5 h-5 text-[#d1d5db] group-hover:text-[#111827] transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
