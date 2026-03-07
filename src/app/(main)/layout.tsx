"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Category from "@/components/categories/Category";
import Container from "@/components/Container";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <Container className="pt-20">
        <Category />
      </Container>
      <Container className="pt-2">{children}</Container>

      <Toaster position="top-center" reverseOrder={false} />
    </SessionProvider>
  );
}
