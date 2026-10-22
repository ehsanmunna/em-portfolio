import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import { siteConfig, themeStyle } from "@/config/site";
import { portfolioContent } from "@/config/portfolio";
import { WhatsappFloat } from "@/components/whatsapp-float";
import "./globals.css";


export const metadata: Metadata = {
  title: `${siteConfig.name} | Full-stack Web Developer`,
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeStyle}>
      <header className="p-4 bg-white shadow-sm flex gap-4">
        <a href="/" className="font-bold hover:text-blue-600">Home</a>
        <a href="/about" className="font-bold hover:text-blue-600">About</a>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-50XCVL1FR4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-50XCVL1FR4');`}
        </Script>
      </header>
      <body>
        {children}
        {portfolioContent.contact.whatsapp.showWhatsapp && <WhatsappFloat />}
      </body>
    </html>
  );
}