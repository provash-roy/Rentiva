"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Category from "@/components/navbar/Category";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          {/* Navbar fixed at top */}
          <header className="w-full fixed top-0 left-0 z-50">
            <Navbar />
          </header>

          {/* Category below Navbar */}
          <div className="pt-4 fixed top-16 w-full z-40 bg-white shadow-sm">
            <Category />
          </div>

          {/* Main Content */}
          <main className="pt-32 flex justify-center items-start min-h-screen px-4">
            <div className="w-full max-w-6xl">{children}</div>
          </main>

          {/* Toast Notifications */}
          <Toaster position="top-center" reverseOrder={false} />
        </SessionProvider>
      </body>
    </html>
  );
}
