import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "金融资料站 - 精选金融资料·一站式获取",
  description: "精选金融资料，涵盖研报、数据、策略、模板，一站式获取。",
  icons: {
    icon: "/favicon.ico",
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
        {/* 内联关键样式，防止 CSS 加载前的白屏闪烁 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{background:#f6f8fb;color:#172033;font-family:"PingFang SC","Microsoft YaHei","Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased;margin:0;min-height:100vh}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
