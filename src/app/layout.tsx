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
            {/* Sonner ships rounded corners, a drop shadow and its own green and
                red. None of that exists anywhere else here, so the defaults are
                turned off and the toast is built from the same panel surface as
                the contact block: square corners, a hairline border, and the
                accent only as a rule down the left edge. */}
            <Toaster
              position="bottom-right"
              offset={20}
              gap={8}
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast:
                    "flex w-full items-start gap-3 rounded-xs border border-on-panel-rule border-l-2 bg-panel px-4 py-3 font-body text-sm leading-relaxed text-on-panel",
                  /* the left rule carries success or failure, so the stock
                     check and cross would be saying it twice */
                  icon: "hidden",
                  title: "font-medium",
                  description: "mt-0.5 text-on-panel-muted",
                  success: "border-l-accent-on-panel",
                  error: "border-l-danger-on-panel",
                  info: "border-l-on-panel-rule",
                  warning: "border-l-danger-on-panel",
                  actionButton: "label rounded-xs bg-on-panel px-2.5 py-1 text-panel",
                  cancelButton: "label text-on-panel-muted",
                  closeButton: "text-on-panel-muted hover:text-on-panel",
                },
              }}
            />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
