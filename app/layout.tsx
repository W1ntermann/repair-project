import type { Metadata, Viewport } from 'next';
import { Inter, Lato } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ремонт під ключ в Одесі | Pro Repair – 17 років досвіду та гарантія якості',
  description: 'Преміальний ремонт квартир, будинків та офісів в Одесі під ключ. 17+ років досвіду, 500+ об\'єктів, власна дизайн-студія та меблеве виробництво. Безкоштовний замір та консультація.',
  keywords: 'ремонт під ключ Одеса, ремонт квартир Одеса, дизайн інтер\'єру Одеса, будівництво будинків Одеса, ремонт під ключ, оздоблення Одеса',
  robots: 'index, follow',
  openGraph: {
    title: 'Ремонт під ключ в Одесі | Pro Repair – 17 років досвіду та гарантія якості',
    description: 'Преміальний ремонт квартир, будинків та офісів в Одесі під ключ. 17+ років досвіду, 500+ об\'єктів.',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Pro Repair',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ремонт під ключ в Одесі | Pro Repair',
    description: 'Преміальний ремонт під ключ з 17-річним досвідом. Кожен проєкт — витвір мистецтва.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${lato.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}