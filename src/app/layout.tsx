import type { Metadata } from 'next';
import { Cinzel, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

export const metadata: Metadata = {
  title: 'Tejas Tyagi - Portfolio',
  description: 'Full-Stack Developer & AI Specialist',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-[#0f1115] ${cinzel.variable} ${ibmPlexSans.variable}`}
    >
      <body className={`${ibmPlexSans.className} bg-[#0f1115]`}>
        {children}
      </body>
    </html>
  );
}
