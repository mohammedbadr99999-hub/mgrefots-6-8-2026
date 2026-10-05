import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Language } from '../types';

export function CheckoutPage({ lang }: { lang: Language }) {
  const { productId } = useParams();
  const product = PRODUCTS.find(p => p.id === productId);
  const [quantity, setQuantity] = useState('1');
  const [reviewing, setReviewing] = useState(false);
  const [details, setDetails] = useState({ name: '', phone: '', city: '', area: '', street: '', location: '' });
  const ar = lang === 'ar';
  if (!product || product.isSoldOut) return <section className="max-w-xl mx-auto p-8 text-white space-y-6">
    <h1 className="text-2xl font-bold">{ar ? 'هذا المنتج غير متاح للطلب حالياً' : 'This product is unavailable to order'}</h1>
    <Link to="/products" className="text-amber-400">{ar ? 'العودة للمنتجات' : 'Back to products'}</Link>
  </section>;
  const count = Number(quantity);
  const valid = Number.isInteger(count) && count >= 1 && count <= 100;
  const unitPrice = Number(product.price.replace(/[^0-9]/g, ''));
  const message = [
    'MGREFOTS — New order request',
    `Product: ${product.name.en}`, `Pack size: ${product.size}`, `Quantity: ${count}`,
    `Displayed unit price: ${product.price}`, `Product subtotal: ${(count * unitPrice).toLocaleString()} RWF`,
    `Name: ${details.name.trim()}`, `Phone: ${details.phone.trim()}`,
    `City: ${details.city.trim()}`, `Area: ${details.area.trim()}`, `Street number: ${details.street.trim()}`,
    details.location.trim() ? `Location: ${details.location.trim()}` : '',
    'Please confirm availability, final total including delivery, and MoMo payment details. Payment not yet made.',
  ].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(message)}`;
  const fields = [
    ['name', ar ? 'الاسم بالكامل' : 'Full name', 'text', 'name'],
    ['phone', ar ? 'رقم التليفون' : 'Phone number', 'tel', 'tel'],
    ['city', ar ? 'اسم المدينة' : 'City', 'text', 'address-level2'],
    ['area', ar ? 'اسم المنطقة' : 'Area / neighbourhood', 'text', 'address-level3'],
    ['street', ar ? 'رقم الشارع' : 'Street number', 'text', 'street-address'],
    ['location', ar ? 'رابط اللوكيشن (اختياري)' : 'Location link (optional)', 'url', 'off'],
  ];
  return <section dir={ar ? 'rtl' : 'ltr'} className="max-w-4xl mx-auto py-6 text-white space-y-6">
    <Link to="/products" className="text-amber-400">{ar ? 'العودة للمنتجات' : 'Back to products'}</Link>
    <h1 className="text-3xl font-black">{ar ? 'اطلب منتجك' : 'Place your order'}</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <aside className="rounded-3xl border border-slate-700 bg-[#091833] p-6 space-y-4 self-start">
        <img src={product.image} alt={product.name[lang]} className="w-full h-64 object-contain rounded-2xl" />
        <h2 className="text-xl font-bold">{product.name[lang]}</h2><p>{product.size}</p>
        <p className="text-amber-400 font-bold">{product.price} {ar ? 'للعبوة' : 'per pack'}</p>
        <label className="block">{ar ? 'عدد العبوات' : 'Number of packs'}
          <input type="number" min="1" max="100" step="1" required value={quantity} disabled={reviewing}
            onChange={e => setQuantity(e.target.value)} className="block w-full mt-2 p-3 rounded-xl bg-[#030914] border border-slate-600" />
        </label>
        {!valid && <p role="alert" className="text-red-300">{ar ? 'أدخل عدداً صحيحاً من ١ إلى ١٠٠' : 'Enter a whole number from 1 to 100'}</p>}
        <p className="text-xl font-bold">{ar ? 'إجمالي المنتجات' : 'Product subtotal'}: {valid ? (count * unitPrice).toLocaleString() : '—'} RWF</p>
        <p className="text-sm text-slate-300">{ar ? 'هنأكد إجمالي الطلب والتوصيل وبيانات الدفع على واتساب قبل التحويل.' : 'We will confirm the total, delivery and MoMo payment details on WhatsApp before you pay.'}</p>
      </aside>
      <form onSubmit={e => { e.preventDefault(); if (valid && ['name', 'phone', 'city', 'area', 'street'].every(key => details[key as keyof typeof details].trim())) setReviewing(true); }} className="rounded-3xl border border-slate-700 bg-[#091833] p-6 space-y-4">
        <h2 className="text-xl font-bold">{ar ? 'بيانات التوصيل' : 'Delivery details'}</h2>
        {fields.map(([key, label, type, autoComplete]) => <label key={key} className="block text-sm font-semibold">{label}
          <input type={type} autoComplete={autoComplete} required={key !== 'location'} maxLength={key === 'location' ? 500 : 150}
            readOnly={reviewing} value={details[key as keyof typeof details]}
            onChange={e => setDetails({ ...details, [key]: e.target.value })}
            className="block w-full mt-2 p-3 rounded-xl bg-[#030914] border border-slate-600 focus:outline-amber-400" />
        </label>)}
        {!reviewing ? <button disabled={!valid} className="w-full rounded-xl p-4 bg-amber-400 text-slate-950 font-bold disabled:opacity-40">{ar ? 'مراجعة الطلب' : 'Review order'}</button> : <div className="space-y-4" aria-live="polite">
          <h3 className="font-bold">{ar ? 'مراجعة الطلب' : 'Order review'}</h3>
          <p>{count} × {product.name[lang]} — {(count * unitPrice).toLocaleString()} RWF</p>
          <p>{details.city} · {details.area} · {details.street}</p>
          <p role="status" className="rounded-xl bg-slate-800 p-4 text-sm">{ar ? 'الزر يفتح واتساب برسالة طلبك. اضغط إرسال داخل واتساب لإرسالها. الدفع يتم بتحويل MoMo بعد تأكيدنا للطلب.' : 'The button opens WhatsApp with your order. Tap Send in WhatsApp to submit it. Pay by MoMo transfer after we confirm your order.'}</p>
          <button type="button" onClick={() => setReviewing(false)} className="text-amber-400 underline">{ar ? 'تعديل البيانات' : 'Edit details'}</button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-green-600 text-white text-center font-bold rounded-xl">{ar ? 'إرسال الطلب على واتساب' : 'Send order on WhatsApp'}</a>
        </div>}
      </form>
    </div>
  </section>;
}
