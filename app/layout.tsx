import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lato:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}