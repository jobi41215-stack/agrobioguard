import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgroBioGuard | AI-Powered Protection for Farms & Nature",
  description: "An AI-Based Location-Aware System for Flora and Fauna Identification and Agricultural Risk Assessment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
