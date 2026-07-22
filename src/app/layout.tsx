import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripawAlpha — 用结构理解市场",
  description: "专注于缠论、市场结构与系统化交易框架的研究型平台。结构胜于预测，框架优于指标。",
  icons: {
    icon: "/products/logo.png",
  },
  openGraph: {
    title: "TripawAlpha — 用结构理解市场",
    description: "专注于缠论、市场结构与系统化交易框架的研究型平台。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* 内联关键样式，防止 CSS 加载前的白屏闪烁 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{background:#fafaf8;color:#111827;font-family:"Inter","PingFang SC","HarmonyOS Sans SC","Noto Sans SC","Microsoft YaHei",sans-serif;-webkit-font-smoothing:antialiased;margin:0;min-height:100vh}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* ---- Global Footer ---- */}
        <footer className="border-t border-[#e5e7eb] bg-[#ffffff]">
          <div className="mx-auto max-w-[1040px] px-6 md:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[#111827] mb-3">
                  <img src="/products/logo.png" alt="TripawAlpha" className="w-7 h-7 rounded-md object-contain" />
                  TripawAlpha
                </Link>
                <p className="text-sm text-[#6b7280] leading-relaxed max-w-xs">
                  用结构理解市场<br />
                  <span className="text-[#9ca3af]">Structure over prediction.</span>
                </p>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-4">产品</h4>
                <ul className="space-y-3">
                  <li><Link href="/product/product-pro" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">Pro 套餐</Link></li>
                  <li><Link href="/product/product-04" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">零师研习资料库</Link></li>
                  <li><Link href="/product/product-03" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">波动猎手指标</Link></li>
                  <li><Link href="/product/product-02" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">缠缠缠工具包</Link></li>
                  <li><Link href="/product/product-01" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">同构笔操盘图谱</Link></li>
                </ul>
              </div>

              {/* Research */}
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-4">研究方向</h4>
                <ul className="space-y-3">
                  <li><span className="text-sm text-[#6b7280]">缠论</span></li>
                  <li><span className="text-sm text-[#6b7280]">市场结构</span></li>
                  <li><span className="text-sm text-[#6b7280]">价格行为 (SMC)</span></li>
                  <li><span className="text-sm text-[#6b7280]">交易心理</span></li>
                  <li><span className="text-sm text-[#6b7280]">系统化交易</span></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-[#111827] mb-4">联系</h4>
                <ul className="space-y-3">
                  <li><span className="text-sm text-[#6b7280]">微信：Kxkkk2020</span></li>
                  <li><Link href="https://mp.weixin.qq.com/s/fsXZEaC5BgyjALn1twlO3w" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">公众号</Link></li>
                  <li><Link href="/" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">首页</Link></li>
                  <li><Link href="/#faq" className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors">常见问题</Link></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-[#e5e7eb] text-center text-sm text-[#9ca3af]">
              &copy; {new Date().getFullYear()} TripawAlpha. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
