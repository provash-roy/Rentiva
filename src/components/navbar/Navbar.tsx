"use client";

import UserMenu from "./UserMenu";
import Search from "./Search";

interface NavbarProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <>
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-rose-500 font-bold text-xl">StayNest</div>

          <Search />

          <UserMenu currentUser={currentUser} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
