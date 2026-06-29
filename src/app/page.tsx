import { products, siteName, siteDesc, contactInfo } from "@/data/products";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e9f0]">
        <nav className="mx-auto flex items-center justify-between h-16 px-6 max-w-[1120px]">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-[#111827] text-lg">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-sm font-bold">
              {siteName.charAt(0) || "S"}
            </div>
            <span>{siteName}</span>
          </Link>
          <a href="#contact" className="inline-flex items-center h-9 px-4 text-sm font-semibold text-[#657086] border border-[#e5e9f0] rounded-lg bg-white hover:border-[#2f6fed]/40 hover:text-[#2f6fed] transition-colors">
            联系我
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1120px] px-6 pt-16 pb-10 text-center">
        <p className="text-sm font-semibold text-[#2f6fed] tracking-wide mb-3">Product Hub</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">{siteDesc}</h1>
        <p className="text-lg text-[#657086] max-w-xl mx-auto">选择你需要的资料，获取专业内容，提升你的投资决策效率。</p>
      </section>

      {/* 产品网格 */}
      <section className="mx-auto max-w-[1120px] px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.disabled ? "#" : `/product/${product.id}`}
              className={`group relative flex flex-col rounded-2xl bg-white border border-[#e5e9f0] overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-[#2f6fed]/8 hover:border-[#2f6fed]/30 ${
                product.disabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* 产品图片 */}
              <div className="relative h-48 bg-gradient-to-br from-[#f0f4ff] to-[#e8f4f8] flex items-center justify-center overflow-hidden">
                {product.image && product.image !== "/products/placeholder.png" ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl opacity-20">📊</div>
                )}
                {product.tag && (
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 text-xs font-bold text-white bg-[#2f6fed] rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* 产品信息 */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-bold text-[#111827] mb-2">{product.name}</h2>
                <p className="text-sm text-[#657086] leading-relaxed mb-4 flex-1 line-clamp-2">{product.subtitle}</p>

                {product.disabled ? (
                  <span className="text-sm font-semibold text-[#657086]">Coming Soon</span>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-[#2f6fed]">¥{product.price}</span>
                    <span className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-[#2f6fed] rounded-lg group-hover:bg-[#2563eb] transition-colors">
                      查看详情
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 联系购买 */}
      <section className="mx-auto max-w-[1120px] px-6 pb-20">
        <div className="bg-gradient-to-br from-[#f0f4ff] to-[#e8f4f8] rounded-2xl border border-[#d4e0ff] p-8 md:p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
            💬
          </div>
          <h2 className="text-2xl font-extrabold text-[#111827] mb-2">感兴趣？联系我购买</h2>
          <p className="text-[#657086] mb-4">添加微信时请说明需要哪个产品</p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-[#e5e9f0] shadow-sm">
            <span className="text-sm text-[#657086]">微信：</span>
            <span className="text-lg font-bold text-[#111827]">{contactInfo.wechat}</span>
          </div>
          {contactInfo.email && (
            <p className="mt-4 text-sm text-[#657086]">
              或邮箱：<a href={`mailto:${contactInfo.email}`} className="text-[#2f6fed] font-semibold hover:underline">{contactInfo.email}</a>
            </p>
          )}
        </div>
      </section>

      {/* 页脚 */}
      <footer id="contact" className="mt-auto border-t border-[#e5e9f0] bg-white">
        <div className="mx-auto max-w-[1120px] px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-xs font-bold">
                {siteName.charAt(0) || "S"}
              </div>
              <span className="font-bold text-[#111827]">{siteName}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#657086]">
              {contactInfo.wechat && <span>微信：{contactInfo.wechat}</span>}
              {contactInfo.email && <span>邮箱：{contactInfo.email}</span>}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#e5e9f0] text-center text-xs text-[#657086]">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
