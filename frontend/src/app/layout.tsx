'use client';

import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Usamos Open Sans também para a variável "mono" para unificar a tipografia.
const openSansMono = Open_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const AppBody = ({ children }: { children: ReactNode }) => (
  <body
    suppressHydrationWarning
    className={`${openSans.variable} ${openSansMono.variable} antialiased bg-background text-foreground`}
  >
    {children}
    <Toaster richColors position="top-right" />
  </body>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <AppBody>{children}</AppBody>
    </html>
  );
}
