import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from 'sonner'
import Providers from "./providers";
import SmoothScroll from "@/components/smooth-scroll";
import { getSession } from "@/lib/auth";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";

const SITE = "https://jstnlt.my.id";
const description =
  "Jastin Linggar Tama, fullstack developer in Purwokerto, Indonesia. Go, TypeScript and PHP across school and finance systems, plus open source other people run.";

/* metadataBase is what makes every relative URL below resolve, including the
 * social card Next builds from opengraph-image.png. Without it the card is
 * advertised with a relative path and no crawler can fetch it. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Jastin Linggar Tama, fullstack developer",
    template: "%s / jstnlt",
  },
  description,
  applicationName: "jstnlt.my.id",
  authors: [{ name: "Jastin Linggar Tama", url: SITE }],
  creator: "Jastin Linggar Tama",
  publisher: "Jastin Linggar Tama",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "jstnlt.my.id",
    locale: "en_GB",
    title: "Jastin Linggar Tama, fullstack developer",
    description,
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jastin Linggar Tama, fullstack developer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/* Search engines read this to answer "who is Jastin Linggar Tama" with the
 * right person rather than guessing from the page copy. Everything in it is
 * already visible on the page; nothing is asserted here that is not. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jastin Linggar Tama",
  url: SITE,
  jobTitle: "Fullstack developer",
  address: { "@type": "PostalAddress", addressLocality: "Purwokerto", addressCountry: "ID" },
  sameAs: [
    "https://github.com/JastinXyz",
    "https://www.linkedin.com/in/jastinlinggartama",
    "https://instagram.com/jstn.lt",
  ],
};

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
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap"
          rel="stylesheet"
        />
        {/* Sets the class the parked reveal styles are gated on, before the
            first paint. If this never runs, nothing is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-motion')`,
          }}
        />
      </head>
      <body id="top" className="font-body bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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
