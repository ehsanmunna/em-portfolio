import type { Metadata } from "next";
import Head from "next/head";
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
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-50XCVL1FR4"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-50XCVL1FR4');
        </script>
      </Head>
      <body>
        {children}
        {portfolioContent.contact.whatsapp.showWhatsapp && <WhatsappFloat />}
      </body>
    </html>
  );
}
