"use client";

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { interGlobalFont } from "@/commons/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [topNavHeight, setTopNavHeight] = useState<number | undefined>();

  return (
    <html lang="en">
      <body
        className={`${interGlobalFont.className} flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar topNavHeightChange={(height) => setTopNavHeight(height)} />
          <div
            className="flex-grow"
            style={{
              paddingTop: topNavHeight ? `${topNavHeight}px` : "",
            }}
          >
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
