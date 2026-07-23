import { products } from "@/data/products";
import Link from "next/link";
import Reveal from "@/components/Reveal";

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden hover:shadow-md hover:border-[#d1d5db] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#f3f4f6] overflow-hidden">
        {product.image && product.image !== "/products/placeholder.svg" ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#d1d5db] text-sm">暂无配图</div>
        )}
        {product.tag && (
          <span className={`absolute top-3 left-3 px-2 py-0.5 text-[11px] font-semibold text-white rounded-md backdrop-blur-sm ${
            product.tag === "Pro 专享" ? "bg-[#f59e0b]" : "bg-[#111827]/70"
          }`}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#111827] mb-1.5">{product.name}</h3>
        <p className="text-sm text-[#6b7280] leading-relaxed mb-5 line-clamp-2">{product.subtitle}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-[#111827]">¥{product.price}</span>
          <span className="text-[15px] font-semibold text-[#111827] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            了解详情
            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ---- Hero ---- */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#fefdfb] to-[#fafaf8]">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-[#0ea5e9]/[0.04] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-[#111827]/[0.02] blur-2xl pointer-events-none" />

        <div className="relative mx-auto max-w-[1040px] px-6 md:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#6b7280] tracking-[0.15em] uppercase mb-4">
              TripawAlpha
            </p>
            <h1 className="text-[2.4rem] md:text-[3.5rem] font-extrabold text-[#111827] leading-[1.1] tracking-tight mb-6">
              用结构<br />理解市场
            </h1>
            <p className="text-lg text-[#6b7280] leading-relaxed max-w-lg mb-10">
              专注于缠论、市场结构与系统化交易框架的研究型平台。<br />
              结构胜于预测，框架优于指标。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 h-12 px-7 text-[15px] font-semibold text-white bg-[#111827] rounded-xl hover:bg-[#1f2937] transition-colors"
              >
                浏览产品
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#research"
                className="inline-flex items-center h-12 px-7 text-[15px] font-semibold text-[#111827] border border-[#e5e7eb] rounded-xl hover:bg-[#f3f4f6] transition-colors"
              >
                阅读研究
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#6b7280]">
              关注公众号：<span className="font-semibold text-[#111827]">三脚猫投资圈</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---- Philosophy ---- */}
      <section className="w-full bg-white">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <h2 className="text-2xl font-bold text-[#111827] mb-10">交易哲学</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "市场奖励结构，而非预测", body: "短线猜涨跌无法持续盈利。真正的优势来自理解市场结构，建立可复用的分析框架。" },
              { label: "好的交易是可复现的", body: "一次运气不能证明任何事。一套能反复执行的流程，才是交易者的长期护城河。" },
              { label: "框架比指标更重要", body: "指标是工具，框架是思维方式。没有框架，再多指标也只是噪声。" },
              { label: "交易是一套决策系统", body: "买什么、什么时候买、买多少、什么时候卖——每一步都应该是规则驱动的决策，而非情绪反应。" },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-base font-bold text-[#111827] mb-2">{item.label}</h3>
                <p className="text-[15px] text-[#6b7280] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- Hub: 研究 · 产品 · 公众号 ---- */}
      <section className="w-full bg-white">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <h2 className="text-2xl font-bold text-[#111827] mb-10">探索更多</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 研究文章 */}
            <Link href="/#research" className="group rounded-2xl bg-white border border-[#e5e7eb] p-6 hover:shadow-sm hover:border-[#d1d5db] transition-all duration-300">
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] rounded-md mb-4">研究</span>
              <h3 className="text-base font-bold text-[#111827] mb-2">研究文章</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">缠论、市场结构与系统化交易的深度分析。</p>
            </Link>

            {/* 精选产品 */}
            <Link href="/#products" className="group rounded-2xl bg-white border border-[#e5e7eb] p-6 hover:shadow-sm hover:border-[#d1d5db] transition-all duration-300">
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] rounded-md mb-4">产品</span>
              <h3 className="text-base font-bold text-[#111827] mb-2">精选产品</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">指标、工具包、研习资料与 Pro 画笔工具。</p>
            </Link>

            {/* 公众号 */}
            <div className="group rounded-2xl bg-white border border-[#e5e7eb] p-6">
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] rounded-md mb-4">公众号</span>
              <h3 className="text-base font-bold text-[#111827] mb-2">三脚猫投资圈</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed mb-4">猫哥的原创交易内容，每周更新实盘复盘与市场分析。</p>
              <div className="w-32 h-32 mx-auto">
                <img src="/products/公众号二维码.jpg" alt="三脚猫投资圈公众号二维码" className="w-full h-full object-contain rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- Research ---- */}
      <section id="research" className="w-full bg-[#fafaf8]">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">研究文章</h2>
              <p className="text-[15px] text-[#6b7280]">猫哥的原创交易研究，持续更新中。</p>
            </div>
            <Link href="/research" className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827] hover:text-[#0ea5e9] transition-colors">
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["技术分析", "交易心理", "交易系统"].map((topic) => (
              <Link
                key={topic}
                href="/research"
                className="group rounded-2xl bg-white border border-[#e5e7eb] p-6 hover:shadow-sm hover:border-[#d1d5db] transition-all duration-300"
              >
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] rounded-md mb-4">
                  {topic}
                </span>
                <h3 className="text-base font-bold text-[#111827] mb-2 group-hover:text-[#0ea5e9] transition-colors">{topic}研究</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{topic === "技术分析" ? "缠论、同构笔、市场结构深度剖析。" : topic === "交易心理" ? "克服人性弱点，建立纪律性交易思维。" : "从策略设计到执行复盘，构建可复用的交易框架。"}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/research" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827] hover:text-[#0ea5e9] transition-colors">
              查看全部文章 →
            </Link>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- Featured Products ---- */}
      <section id="products" className="w-full bg-white">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <h2 className="text-2xl font-bold text-[#111827] mb-10">精选产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter((p) => !p.disabled).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- Trust ---- */}
      <section className="w-full bg-[#fafaf8]">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <h2 className="text-2xl font-bold text-[#111827] mb-10">为什么信任我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "持续更新", desc: "资料和工具持续维护迭代，不是一次性交付就消失。" },
              { title: "原创研究", desc: "所有内容来自猫哥的第一手交易研究，不搬运不拼凑。" },
              { title: "工具辅助", desc: "Pro 套餐提供网页版分析工具，降低实战门槛。" },
              { title: "售后答疑", desc: "购买后加入答疑群，猫哥本人解答交易相关问题。" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-white border border-[#e5e7eb]">
                <h3 className="text-base font-bold text-[#111827] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- FAQ ---- */}
      <section id="faq" className="w-full bg-white">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24">
          <h2 className="text-2xl font-bold text-[#111827] mb-10">常见问题</h2>
          <div className="space-y-5">
            {[
              { q: "如何购买产品？", a: "添加猫哥微信 Kxkkk2020，说明需要哪个产品即可。微信直接沟通，方便购买后的答疑、售后和社群服务。虚拟产品，不退不换" },
              { q: "产品资料如何交付？", a: "所有资料默认通过网盘发送（部分敏感通过邮箱），付款后1小时内发出。部分产品附带实体书籍，以产品页面标注为准。" },
              { q: "画线工具支持哪些平台？", a: "网页版工具（Pro 套餐）支持电脑直接访问（不建议手机）。所有通达信指标推荐使用电脑版。" },
              { q: "如何联系售后？", a: "添加微信 Kxkkk2020，说明已购买的产品名称。所有购买用户都会加入对应的答疑群或茶话会交流群。" },
            ].map((item) => (
              <div key={item.q} className="rounded-xl bg-white border border-[#e5e7eb] px-6 py-4">
                <h3 className="text-[15px] font-semibold text-[#111827] mb-2">{item.q}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="w-full bg-[#fafaf8]">
        <Reveal>
        <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-20 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] mb-4">
            开始构建你的交易框架
          </h2>
          <p className="text-[15px] text-[#6b7280] max-w-md mx-auto mb-8">
            结构胜于预测，框架优于指标。加猫哥微信，开始系统化交易之路。
          </p>
          <img
            src="/products/微信图片_2026-07-15_110922_508.jpg"
            alt="猫哥微信二维码"
            className="w-40 h-40 mx-auto mb-6 rounded-xl border border-[#e5e7eb]"
          />
          <p className="text-sm text-[#6b7280] mb-8">微信：Kxkkk2020</p>
          <a
            href="weixin://dl/chat?Kxkkk2020"
            className="inline-flex items-center gap-2 h-12 px-8 text-[15px] font-semibold text-white bg-[#111827] rounded-xl hover:bg-[#1f2937] transition-colors"
          >
            加微信咨询
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
