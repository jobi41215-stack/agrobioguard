import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title:
    "AgroBioGuard | AI-Powered Protection for Farms & Nature",
  description:
    "An AI-Based Location-Aware System for Flora and Fauna Identification and Agricultural Risk Assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}