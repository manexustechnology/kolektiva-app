"use client";

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { interGlobalFont } from "@/commons/font";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interGlobalFont.className} flex flex-col min-h-screen`}
      >
        <Toaster position="bottom-left" />
        <Providers>
          <Navbar />
          <div
            className="flex-grow"
            style={{
              paddingTop: '64px',
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
