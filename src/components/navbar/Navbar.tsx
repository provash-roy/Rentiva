"use client";

import Link from "next/link";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = ({
  currentUser,
}: {
  currentUser?: { name?: string; image?: string } | null;
}) => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-16">
          {/* Left - Logo */}
          <Link href="/" className="text-2xl font-bold text-rose-500">
            StayNest
          </Link>

          {/* Center - Search */}
          <div className="flex-1 px-4 hidden md:flex justify-center">
            <Search />
          </div>

          {/* Right - User Menu */}
          <div className="flex items-center gap-3">
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
