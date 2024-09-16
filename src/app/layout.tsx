"use client";

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { interGlobalFont } from "@/commons/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDetailRoute = pathname.startsWith("/detail");

  return (
    <html lang="en">
      <body
        className={`${interGlobalFont.className} flex flex-col min-h-screen bg-teal-50 md:bg-white`}
      >
        <Providers>
          {!(isMobile && isDetailRoute) ? (
            <>
              <Navbar />
              <div
                className="flex-grow"
                style={{
                  paddingTop: "64px",
                }}
              >
                {children}
              </div>
            </>
          ) : (
            <div className="flex-grow">{children}</div>
          )}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
