'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topNavRef = useRef<HTMLDivElement>(null);
  const [topNavHeight, setTopNavHeight] = useState<number | undefined>();

  useEffect(() => {
    setTopNavHeight(topNavRef.current?.offsetHeight);
  }, [topNavRef.current?.offsetHeight]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar navbarRef={topNavRef} />
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
