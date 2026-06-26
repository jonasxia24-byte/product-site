"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

interface BuySectionProps {
  productId: string;
  price: number;
  deliveryLabel: string;
}

export default function ProductBuySection({ productId, price, deliveryLabel }: BuySectionProps) {
  const router = useRouter();
  const [paying, setPaying] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // 用 ref 追踪组件是否挂载，防止卸载后 setState
  const mountedRef = useRef(true);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, []);

  const pollOrderStatus = useCallback((oid: string, attempts = 0) => {
    if (!mountedRef.current) return;
    if (attempts >= 90) {
      setError("支付超时，请重新购买");
      setPaying(false);
      setQrCode(null);
      return;
    }
    fetch(`/api/order/status?orderId=${oid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mountedRef.current) return;
        if (data.success && (data.status === "paid" || data.status === "delivered")) {
          router.push(`/success?order=${oid}`);
          return;
        }
        if (data.status === "expired") {
          setError("订单已过期，请重新购买");
          setPaying(false);
          setQrCode(null);
          return;
        }
        pollTimerRef.current = setTimeout(() => pollOrderStatus(oid, attempts + 1), 2000);
      })
      .catch(() => {
        if (mountedRef.current) {
          pollTimerRef.current = setTimeout(() => pollOrderStatus(oid, attempts + 1), 2000);
        }
      });
  }, [router]);

  const handleBuy = async () => {
    setPaying(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "支付创建失败");
        setPaying(false);
        return;
      }
      setOrderId(data.orderId);
      if (data.qrCode) {
        setQrCode(data.qrCode);
        pollOrderStatus(data.orderId);
      } else if (data.payUrl) {
        window.location.href = data.payUrl;
      }
    } catch {
      setError("网络错误，请重试");
      setPaying(false);
    }
  };

  return (
    <section className="sticky bottom-0 bg-[#f6f8fb] pt-4 pb-6 -mx-6 px-6">
      <div className="bg-white rounded-2xl border border-[#e5e9f0] shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-[#657086]">价格</p>
            <p className="text-3xl font-extrabold text-[#2f6fed]">¥{price}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#657086]">交付方式</p>
            <p className="text-sm font-semibold text-[#111827]">{deliveryLabel}</p>
          </div>
        </div>

        {qrCode ? (
          <div className="text-center py-4">
            <p className="text-sm text-[#657086] mb-3">请使用微信扫码付款</p>
            <img src={qrCode} alt="付款二维码" className="mx-auto w-40 h-40" />
            <p className="mt-3 text-xs text-[#657086]">订单号：{orderId}</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#657086]">
              <div className="w-4 h-4 border-2 border-[#2f6fed] border-t-transparent rounded-full animate-spin" />
              等待付款中...
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={handleBuy}
              disabled={paying}
              className="w-full py-3.5 text-lg font-bold text-white bg-[#2f6fed] rounded-xl hover:bg-[#2563eb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paying ? "正在创建订单..." : "立即购买"}
            </button>
            {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
          </>
        )}
      </div>
    </section>
  );
}
