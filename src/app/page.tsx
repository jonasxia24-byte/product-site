import { products, siteName, siteDesc, contactInfo, type ProductCategory } from "@/data/products";
import Link from "next/link";

const categories: { key: ProductCategory; label: string }[] = [
  { key: "重点推荐", label: "⭐ 重点推荐" },
  { key: "指标类", label: "📈 指标类" },
  { key: "工具包", label: "🧰 工具包" },
  { key: "其他", label: "📦 其他" },
];

function categoryProducts(cat: ProductCategory) {
  return products.filter((p) => p.category === cat && !p.disabled);
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isExternal = !!product.link;
  const CardWrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href: product.link, target: "_blank", rel: "noopener noreferrer" }
    : { href: product.disabled ? "#" : `/product/${product.id}` };

  return (
    <CardWrapper
      {...wrapperProps}
      className={`group relative flex flex-col rounded-2xl bg-white border border-[#e5e9f0] overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-[#2f6fed]/8 hover:border-[#2f6fed]/30 ${
        product.disabled ? "opacity-50 pointer-events-none" : ""
      } ${isExternal ? "cursor-pointer" : ""}`}
    >
      <div className="relative h-48 bg-gradient-to-br from-[#f0f4ff] to-[#e8f4f8] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement!.querySelector(".fallback")?.classList.remove("hidden"); }}
        />
        <div className={`fallback hidden text-6xl opacity-20 ${isExternal ? "rotate-45" : ""}`}>
          {isExternal ? "🔗" : "📊"}
        </div>
        {product.tag && (
          <span className={`absolute top-3 right-3 px-2.5 py-0.5 text-xs font-bold text-white rounded-full ${
            product.tag === "Pro 专享" ? "bg-gradient-to-r from-[#f59e0b] to-[#d97706]" : "bg-[#2f6fed]"
          }`}>
            {product.tag}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-[#111827] mb-2">{product.name}</h3>
        <p className="text-sm text-[#657086] leading-relaxed mb-4 flex-1 line-clamp-2">{product.subtitle}</p>
        {product.disabled ? (
          <span className="text-sm font-semibold text-[#657086]">Coming Soon</span>
        ) : isExternal ? (
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#f59e0b]">Pro 用户登录使用 →</span>
            <span className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-lg hover:from-[#d97706] hover:to-[#b45309] transition-colors">
              登录使用
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
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
    </CardWrapper>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e9f0]">
        <nav className="mx-auto flex items-center justify-between h-16 px-6 max-w-[1120px]">
          <Link href="/" className="flex items-center gap-3 font-extrabold text-[#111827] text-lg">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-sm font-bold">
              {siteName.charAt(0)}
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">{siteName}</h1>
        <p className="text-lg text-[#657086] max-w-xl mx-auto">{siteDesc}</p>
      </section>

      {/* 按分类展示 */}
      {categories.map(({ key, label }) => {
        const items = categoryProducts(key);
        if (items.length === 0) return null;
        return (
          <section key={key} className="mx-auto max-w-[1120px] px-6 pb-12">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">{label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

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
        </div>
      </section>

      {/* 页脚 */}
      <footer id="contact" className="mt-auto border-t border-[#e5e9f0] bg-white">
        <div className="mx-auto max-w-[1120px] px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2f6fed] to-[#14b8c8] flex items-center justify-center text-white text-xs font-bold">
                {siteName.charAt(0)}
              </div>
              <span className="font-bold text-[#111827]">{siteName}</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#657086]">
              {contactInfo.wechat && <span>微信：{contactInfo.wechat}</span>}
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
