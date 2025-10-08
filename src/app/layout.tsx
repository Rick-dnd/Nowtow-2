import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { CookieBanner } from '@/components/layout/CookieBanner';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nowtown - Dein lokales Erlebnis-Netzwerk',
  description: 'Entdecke Events, Räume und Services in München',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="de" className={manrope.variable} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
