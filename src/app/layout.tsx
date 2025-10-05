import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import { CookieBanner } from '@/components/layout/CookieBanner';
import './globals.css';

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
    <html lang="de">
      <body>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
