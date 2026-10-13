import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-[#090a0f] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
