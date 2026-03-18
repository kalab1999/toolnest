import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ToolNest - Free Online Tools for Images, Converters & Utilities",
  description: "ToolNest provides fast, simple, and powerful tools to help you work with images, text, and conversions instantly.",
  verification: {
    google: "Rbw65C7ATHWNtgSuChVcDEGQx4h1LZtEb95sgtTRZr8"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
