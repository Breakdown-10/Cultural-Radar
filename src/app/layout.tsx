import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers';
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Culture Radar | AI Cultural Intelligence & Event Strategy Agent',
  description:
    'Turn audience taste affinities into evidence-grounded, distinctive event strategies with Qloo Cultural Intelligence.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[#08090d] text-slate-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-200"
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
