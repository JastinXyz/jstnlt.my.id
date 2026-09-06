import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from 'sonner'
import Providers from "./providers";
import SmoothScroll from "@/components/smooth-scroll";
import { getSession } from "@/lib/auth";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

const description = "Jastin Linggar Tama, fullstack developer in Purwokerto, Indonesia. Go, TypeScript and PHP across school and finance systems, plus open source other people run.";

export const metadata: Metadata = {
  title: {
    default: "jstnlt",
    template: "jstnlt / %s",
  },
  description,
  openGraph: {
    type: 'website',
    title: 'jstnlt',
    description,
    url: 'https://jstnlt.my.id'
  }
}

export const viewport: Viewport = {
  // literal values, kept in sync with --color-paper in tokens.css
  // (the browser chrome needs a concrete colour, not a var())
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top" className="font-body bg-paper text-ink antialiased">
        <Providers session={session}>
          <ThemeProvider attribute="data-theme">
            <SmoothScroll />
            <Toaster richColors position="bottom-right" />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
