"use client";

import "~/styles/globals.css";
//import { ClerkProvider } from "@clerk/nextjs";
import { Rubik } from "next/font/google";
import { Sidebar } from "~/components/Sidebar";
import { useState } from "react";
import { SelectedProjectProvider } from "../context/SelectedProjectContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    //<ClerkProvider>
      <html lang="en" className={`${rubik.variable} font-sans`}>
        <body className="bg-gray-950 text-white min-h-screen flex">
          <SelectedProjectProvider>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-10">{children}</main>
          </SelectedProjectProvider>
        </body>
      </html>
    //</ClerkProvider>
  );
}
