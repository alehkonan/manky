import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
