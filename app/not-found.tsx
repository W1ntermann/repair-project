import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0e0e0e]">
      <div className="max-w-md mx-4 text-center">
        <h1 className="text-[120px] font-heading font-black text-[#C9A84C] leading-none mb-4">
          404
        </h1>
        <p className="text-white/60 font-sans text-lg mb-8">
          Сторінку не знайдено
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 uppercase font-heading font-black tracking-[0.2em] text-[13px] text-[#0e0e0e]"
          style={{ background: 'linear-gradient(135deg,#E2C97E,#C9A84C,#8B6914)' }}
        >
          НА ГОЛОВНУ
        </Link>
      </div>
    </div>
  );
}