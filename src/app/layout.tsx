import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from 'sonner'
import Providers from "./providers";
import { getSession } from "../../auth.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "jstnlt",
    template: "jstnlt — %s",
  },
  description: "Jastin Linggar Tama is a passionate software engineering student from Purwokerto, Indonesia, specializing in web development and UI/UX design. Since 2020, he has been actively building projects and improving his technical skills.",
  openGraph: {
    type: 'website',
    title: 'jstnlt',
    description: "Jastin Linggar Tama is a passionate software engineering student from Purwokerto, Indonesia, specializing in web development and UI/UX design. Since 2020, he has been actively building projects and improving his technical skills.",
    url: 'https://jstnlt.my.id'
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-geist antialiased max-w-4xl mx-auto px-6 md:px-4 pt-8 pb-4 bg-[#FEFEFF]`}
      >
        <Providers session={session}>
          <Toaster richColors />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
