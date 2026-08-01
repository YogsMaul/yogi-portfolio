import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SplashLoader } from "@/components/ui/splash-loader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yogimaul-portfolio.vercel.app'),
  title: {
    default: 'Achmad Yogi Maulana — Mobile Developer',
    template: '%s | Achmad Yogi Maulana',
  },
  description:
    'Portofolio Achmad Yogi Maulana — Mobile Developer spesialisasi Flutter & Kotlin. Berpengalaman membangun sistem parkir digital, QRIS payment, AI assistant, dan aplikasi Android native.',
  keywords: [
    'Achmad Yogi Maulana',
    'Mobile Developer',
    'Flutter Developer',
    'Kotlin Developer',
    'Android Developer',
    'Palembang',
    'Portofolio Mobile Developer',
    'Jetpack Compose',
    'BLoC Pattern',
  ],
  authors: [{ name: 'Achmad Yogi Maulana' }],
  creator: 'Achmad Yogi Maulana',
  icons: {
    icon: '/logo_yogi.png',
    shortcut: '/logo_yogi.png',
    apple: '/logo_yogi.png',
  },
  openGraph: {
    title: 'Achmad Yogi Maulana — Mobile Developer (Flutter & Kotlin)',
    description:
      'Portofolio Achmad Yogi Maulana — Mobile Developer spesialisasi Flutter & Kotlin. Berpengalaman membangun sistem parkir digital, QRIS payment, AI assistant, dan aplikasi Android native.',
    url: 'https://yogimaul-portfolio.vercel.app',
    siteName: 'Achmad Yogi Maulana — Portfolio',
    images: [
      {
        url: '/yogi_porto.jpg',
        width: 800,
        height: 800,
        alt: 'Achmad Yogi Maulana - Mobile Developer',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Achmad Yogi Maulana — Mobile Developer',
    description:
      'Portofolio Achmad Yogi Maulana — Mobile Developer spesialisasi Flutter & Kotlin.',
    images: ['/yogi_porto.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-sans">
        <CustomCursor />
        <SplashLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
