import { products, contactInfo } from "@/data/products";
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
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">产品不存在</h1>
          <Link href="/" className="text-sm font-semibold text-[#6b7280] hover:text-[#111827] transition-colors">← 返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* ---- Hero ---- */}
      <section className="mx-auto max-w-[1040px] px-6 md:px-8 pt-12 pb-8 md:pt-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#111827] transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div>
            {product.tag && (
              <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold text-white rounded-md mb-4 ${
                product.tag === "Pro 专享" ? "bg-[#f59e0b]" : "bg-[#111827]"
              }`}>
                {product.tag}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] leading-tight mb-3">{product.name}</h1>
            <p className="text-lg text-[#6b7280] leading-relaxed mb-8">{product.subtitle}</p>

            {/* Price + CTA */}
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-3xl font-extrabold text-[#111827]">¥{product.price}</span>
            </div>
          </div>

          {/* Right: Image */}
          <div className="rounded-2xl overflow-hidden bg-white border border-[#e5e7eb]">
            {product.image && product.image !== "/products/placeholder.png" ? (
              <img src={product.image} alt={product.name} className="w-full h-auto" />
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center text-sm text-[#d1d5db]">暂无配图</div>
            )}
          </div>
        </div>
      </section>

      {/* ---- Product Overview ---- */}
      <section className="mx-auto max-w-[1040px] px-6 md:px-8 pb-12">
        <h2 className="text-xl font-bold text-[#111827] mb-6">产品介绍</h2>
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 md:p-8">
          {product.description.split("\n\n").map((para, i) => (
            <p key={i} className="text-[15px] text-[#374151] leading-relaxed mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ---- Pro Login ---- */}
      {product.link && (
        <section className="mx-auto max-w-[1040px] px-6 md:px-8 pb-12">
          <div className="bg-gradient-to-br from-[#fffbeb] to-[#fef3c7] rounded-2xl border border-[#f59e0b]/20 p-8 md:p-10 text-center">
            <h2 className="text-xl font-bold text-[#111827] mb-2">已购 Pro 套餐？</h2>
            <p className="text-[#6b7280] text-sm mb-6">使用购买时获得的账号密码登录，即可使用网页版同构笔辅助工具</p>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-7 text-[15px] font-semibold text-white bg-[#f59e0b] rounded-xl hover:bg-[#d97706] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              登录使用工具
            </a>
          </div>
        </section>
      )}

      {/* ---- Purchase ---- */}
      <section className="mx-auto max-w-[1040px] px-6 md:px-8 pb-20 text-center">
        <div>
          <h2 className="text-xl font-bold text-[#111827] mb-4">如何购买</h2>
          <p className="text-sm text-[#6b7280] mb-6">
            添加猫哥微信 Kxkkk2020，说明需要「{product.name}」
          </p>
          <a
            href={`weixin://dl/chat?${contactInfo.wechat}`}
            className="inline-flex items-center gap-2 h-12 px-8 text-[15px] font-semibold text-white bg-[#111827] rounded-xl hover:bg-[#1f2937] transition-colors"
          >
            微信 {contactInfo.wechat}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <div className="mt-8">
            <Link href="/" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">
              ← 返回首页
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
