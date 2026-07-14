import { products, siteName, contactInfo } from "@/data/products";
import Link from "next/link";

export function generateStaticParams() {
  return products
    .filter((p) => !p.disabled)
    .map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product || product.disabled) {
    return (
      <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">产品不存在</h1>
          <Link href="/" className="text-[#2f6fed] font-semibold hover:underline">← 返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e9f0]">
        <nav className="mx-auto flex items-center justify-between h-16 px-6 max-w-[960px]">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-[#111827] text-lg">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-sm font-bold">
              {siteName.charAt(0) || "S"}
            </div>
            <span>{siteName}</span>
          </Link>
          <Link href="/" className="inline-flex items-center h-9 px-4 text-sm font-semibold text-[#657086] border border-[#e5e9f0] rounded-lg bg-white hover:border-[#2f6fed]/40 hover:text-[#2f6fed] transition-colors">
            ← 返回首页
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-[960px] px-6 py-10">
        {/* 标题区 */}
        <div className="mb-6">
          {product.tag && (
            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-[#2f6fed] rounded-full mb-3">
              {product.tag}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2">{product.name}</h1>
          <p className="text-lg text-[#657086]">{product.subtitle}</p>
        </div>

        {/* 产品图片 */}
        <div className="w-full rounded-2xl overflow-hidden mb-8 bg-white border border-[#e5e9f0]">
          {product.image && product.image !== "/products/placeholder.png" ? (
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          ) : (
            <div className="h-48 flex items-center justify-center text-6xl opacity-20">📊</div>
          )}
        </div>

        {/* 产品介绍 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111827] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#2f6fed] rounded-full inline-block" />
            产品介绍
          </h2>
          <div className="bg-white rounded-xl border border-[#e5e9f0] p-6">
            {product.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#374151] leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Pro 登录入口（仅 Pro 套餐显示） */}
        {product.link && (
          <section className="mb-10">
            <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] rounded-2xl border border-[#f59e0b]/30 p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                🔗
              </div>
              <h2 className="text-2xl font-extrabold text-[#111827] mb-2">已购 Pro 套餐？</h2>
              <p className="text-[#657086] mb-6">使用购买时获得的账号密码登录，即可使用网页版同构笔辅助工具</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-bold text-white bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-xl hover:from-[#d97706] hover:to-[#b45309] transition-colors shadow-lg shadow-[#f59e0b]/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                登录使用工具
              </a>
            </div>
          </section>
        )}

        {/* 购买区域 */}
        <div className="bg-gradient-to-br from-[#f0f4ff] to-[#e8f4f8] rounded-2xl border border-[#d4e0ff] p-8 text-center">
          <div className="mb-4">
            <span className="text-3xl font-extrabold text-[#2f6fed]">¥{product.price}</span>
          </div>
          <p className="text-[#657086] mb-1">感兴趣请直接联系购买：</p>
          <p className="text-lg font-bold text-[#111827] mb-4">微信：{contactInfo.wechat}</p>
          <a
            href={`weixin://dl/chat?${contactInfo.wechat}`}
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-bold text-white bg-gradient-to-r from-[#2f6fed] to-[#14b8c8] rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#2f6fed]/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            加微信咨询购买
          </a>
        </div>

        <div className="mt-6 text-center text-sm text-[#657086]">
          如有问题，请联系{" "}
          {contactInfo.wechat && <span>微信：{contactInfo.wechat}</span>}
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-[#2f6fed] hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>
        </div>
      </main>

      <footer className="mt-auto border-t border-[#e5e9f0] bg-white">
        <div className="mx-auto max-w-[960px] px-6 py-6 text-center text-xs text-[#657086]">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
