"use client";

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { interGlobalFont } from "@/commons/font";

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
      <body
        className={`${interGlobalFont.className} flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar navbarRef={topNavRef} />
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
