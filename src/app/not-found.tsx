import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-3">页面不存在</h1>
      <p className="text-[15px] text-[#6b7280] mb-8 max-w-md">
        你访问的页面可能已被移除或链接有误。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 h-11 px-6 text-[15px] font-semibold text-white bg-[#111827] rounded-xl hover:bg-[#1f2937] transition-colors"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
