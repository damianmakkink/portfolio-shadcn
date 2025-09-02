import type { Metadata } from "next";
import { Inclusive_Sans, Fira_Code } from "next/font/google";
import { MotionConfig } from "motion/react";
import StoryblokProvider from "@/components/StoryblokProvider";
import "./globals.css";

const inclusiveSans = Inclusive_Sans({
  variable: '--font-inclusive-sans',
  subsets: ['latin']
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Sonya Moorjani",
  description: "Video editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en" className="dark scroll-smooth">
        <body
          className={`${inclusiveSans.variable} ${firaCode.variable} font-sans antialiased`}
        >
          <MotionConfig
            transition={{ duration: 0.2 }}
          >
            {children}
          </MotionConfig>
        </body>
      </html>
    </StoryblokProvider>
  );
}
