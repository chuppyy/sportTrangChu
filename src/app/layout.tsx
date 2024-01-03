import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <!-- Google tag (gtag.js) -->
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-ML5NCP80D6"></Script>
<Script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ML5NCP80D6');
</Script>
        {children}
      </body>
    </html>
  );
}
