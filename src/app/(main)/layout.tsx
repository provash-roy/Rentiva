import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Category from "@/components/navbar/Category";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="">
          <div>
            <Navbar currentUser={null} />
          </div>
          <div className="flex justify-center items-center min-h-screen">
            <Toaster position="top-center" />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
