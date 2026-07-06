import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pro Repair — Ремонт під ключ в Одесі',
  description: 'Преміальний ремонт під ключ з 17-річним досвідом. Кожен проєкт — витвір мистецтва.',
  robots: 'index, follow',
  openGraph: {
    title: 'Pro Repair — Ремонт під ключ в Одесі',
    description: 'Преміальний ремонт під ключ з 17-річним досвідом. Кожен проєкт — витвір мистецтва.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Repair — Ремонт під ключ в Одесі',
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