'use client';

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
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
      <body className={interGlobalFont.className}>
        <Providers>
          <Navbar topNavHeightChange={(height) => setTopNavHeight(height)} />
          <div
            className="w-full"
            style={{
              paddingTop: topNavHeight ? `${topNavHeight}px` : ''
            }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
