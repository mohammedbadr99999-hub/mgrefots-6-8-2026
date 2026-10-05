import React from 'react';
import { Product, Language } from '../types';
export function OrderButton({ product, lang }: { product: Product; lang: Language }) {
  const style = 'w-full min-h-[48px] px-4 py-3 rounded-2xl font-bold flex items-center justify-center';
  if (product.isSoldOut) return <button disabled className={`${style} bg-slate-800 text-slate-400`}>
    {lang === 'ar' ? 'نفدت الكمية · Sold Out' : 'Sold Out'}
  </button>;
  return <a href={`/checkout/${product.id}`} className={`${style} bg-[#F5A623] text-[#071426] hover:brightness-110`}>
    {lang === 'ar' ? 'اطلب الآن' : lang === 'rw' ? 'Gura ubu' : 'Order now'}
  </a>;
}
