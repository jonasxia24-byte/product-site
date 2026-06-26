"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src || src === "/products/placeholder.png") {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-[#f0f4ff] to-[#e8f4f8] flex items-center justify-center">
        <div className="text-6xl opacity-20">📊</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover max-h-[480px]"
      onError={() => setError(true)}
    />
  );
}
