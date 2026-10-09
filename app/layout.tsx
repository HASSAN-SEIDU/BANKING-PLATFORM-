import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Banking & Susu Management Platform",
  description:
    "A secure management platform for financial institutions, branches, customers, and susu collections."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10243a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
