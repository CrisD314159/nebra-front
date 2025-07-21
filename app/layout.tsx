import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const quicksand = Quicksand({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight:['300', '400', '500']
});


export const metadata: Metadata = {
  title: "Nebra",
  description: "Welcome to Nebra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="description" content="Púrpura Music: Tu música en todas partes" />
        <meta name="theme-color" content="transparent" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Púrpura Music"/>
      </Head>
      <body
        className={`${quicksand.variable} ${quicksand.variable} antialiased h-screen`}
      >
        <Toaster/>
        {children}
      </body>
    </html>
  );
}
