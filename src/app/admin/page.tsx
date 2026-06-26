import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-2xl font-bold mb-6">
        A
      </div>
      <h1 className="text-2xl font-extrabold text-[#111827] mb-3">管理后台</h1>
      <p className="text-[#657086] mb-2 max-w-md">
        Admin Dashboard
      </p>
      <p className="text-sm text-[#657086] mb-8 max-w-md">
        Reserved for Future — 预留功能，后续版本开发。
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
