// src/app/layout.tsx
import BackgroundFX from '@/components/BackGroundFX';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Argix · AI & Software',
  description: 'Argix builds AI products, copilots, and data platforms.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">
        {/* Background global continuo */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <BackgroundFX />
        </div>

        {children}
      </body>
    </html>
  );
}
