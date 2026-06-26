"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

interface DeliveryContent {
  url?: string;
  extraction_code?: string;
  text?: string;
  links?: Array<{ name: string; url: string }>;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");

  const [status, setStatus] = useState<"loading" | "paid" | "error">("loading");
  const [deliveries, setDeliveries] = useState<DeliveryContent[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      setError("缺少订单号");
      return;
    }

    const fetchOrder = async () => {
      try {
        // 1. 检查订单状态
        const res = await fetch(`/api/order/status?orderId=${orderId}`);
        const data = await res.json();

        if (!data.success) {
          setStatus("error");
          setError(data.error || "订单查询失败");
          return;
        }

        if (data.status === "paid" || data.status === "delivered") {
          setStatus("paid");
          // 2. 获取交付内容
          const dlRes = await fetch(`/api/order/detail?orderId=${orderId}`);
          const dlData = await dlRes.json();
          if (dlData.success && dlData.deliveries) {
            setDeliveries(dlData.deliveries);
          }
        } else if (data.status === "pending") {
          setStatus("error");
          setError("订单尚未付款");
        } else if (data.status === "expired") {
          setStatus("error");
          setError("订单已过期，请重新购买");
        }
      } catch {
        setStatus("error");
        setError("网络错误，请刷新重试");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-4">参数错误</h1>
        <p className="text-[#657086] mb-6">缺少订单号</p>
        <Link href="/" className="text-[#2f6fed] font-semibold hover:underline">← 返回首页</Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#2f6fed] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#657086]">正在验证订单...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#111827] mb-2">订单异常</h1>
        <p className="text-[#657086] mb-6">{error}</p>
        <Link href="/" className="text-[#2f6fed] font-semibold hover:underline">← 返回首页</Link>
      </div>
    );
  }

  // status === "paid" — 渲染交付内容
  return (
    <div className="bg-white rounded-2xl border border-[#e5e9f0] p-8 text-center max-w-lg mx-auto w-full">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#24a148]/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-[#24a148]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-extrabold text-[#111827] mb-2">付款成功！</h1>
      <p className="text-[#657086] mb-6">订单号：{orderId}</p>

      {deliveries.length > 0 ? (
        <div className="space-y-4">
          {deliveries.map((delivery, idx) => (
            <DeliveryCard key={idx} delivery={delivery} />
          ))}
        </div>
      ) : (
        <div className="bg-[#f6f8fb] rounded-xl p-6 mb-6">
          <p className="text-sm text-[#657086]">正在获取交付内容...</p>
        </div>
      )}

      <Link href="/" className="inline-block mt-6 text-sm text-[#2f6fed] font-semibold hover:underline">
        ← 返回首页，继续浏览
      </Link>
    </div>
  );
}

// 交付内容卡片（自动识别类型渲染）
function DeliveryCard({ delivery }: { delivery: DeliveryContent }) {
  // 百度网盘
  if (delivery.url) {
    return (
      <div className="bg-[#f6f8fb] rounded-xl p-6 text-left">
        <p className="text-sm font-semibold text-[#111827] mb-3">📦 下载链接</p>
        <a
          href={delivery.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#2f6fed] rounded-lg hover:bg-[#2563eb] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          打开百度网盘
        </a>
        {delivery.extraction_code && (
          <p className="mt-2 text-sm text-[#657086]">
            提取码：<span className="font-mono font-bold text-[#111827]">{delivery.extraction_code}</span>
          </p>
        )}
        <p className="mt-2 text-xs text-[#657086]">链接永久有效，建议保存到自己的网盘</p>
      </div>
    );
  }

  // 纯文本
  if (delivery.text) {
    return (
      <div className="bg-[#f6f8fb] rounded-xl p-6 text-left">
        <p className="text-sm font-semibold text-[#111827] mb-3">📄 内容</p>
        <div className="bg-white rounded-lg p-4 border border-[#e5e9f0]">
          <pre className="text-sm text-[#111827] whitespace-pre-wrap font-mono">{delivery.text}</pre>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(delivery.text || "")}
          className="mt-3 text-sm text-[#2f6fed] font-semibold hover:underline"
        >
          📋 复制内容
        </button>
      </div>
    );
  }

  // 链接列表
  if (delivery.links && delivery.links.length > 0) {
    return (
      <div className="bg-[#f6f8fb] rounded-xl p-6 text-left">
        <p className="text-sm font-semibold text-[#111827] mb-3">🔗 访问链接</p>
        <div className="space-y-2">
          {delivery.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-[#e5e9f0] hover:border-[#2f6fed]/40 transition-colors"
            >
              <svg className="w-4 h-4 text-[#2f6fed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-semibold text-[#111827]">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col items-center justify-center px-6">
      <Suspense fallback={<div className="text-[#657086]">加载中...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
