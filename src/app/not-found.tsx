import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl mb-6 opacity-30">🔍</div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-3">页面不存在</h1>
      <p className="text-lg text-[#657086] mb-8 max-w-md">
        你访问的页面可能已被移除或链接有误。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#2f6fed] rounded-lg hover:bg-[#2563eb] transition-colors"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
