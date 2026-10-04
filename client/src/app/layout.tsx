import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import { siteConfig, themeStyle } from "@/config/site";
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
      <body>
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
