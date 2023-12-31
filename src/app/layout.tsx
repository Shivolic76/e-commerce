// "use client"
import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/redux/Provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let persistor = persistStore(store);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <PersistGate loading={null} persistor={persistor}> */}
            <Header />
            {children}
            <Footer />
          {/* </PersistGate> */}
        </Providers>
      </body>
    </html>
  );
}
