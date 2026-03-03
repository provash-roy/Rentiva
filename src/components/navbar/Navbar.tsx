"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Category from "./Category";
import Container from "../Container";
import RentModal from "../modals/RentModal";

interface NavbarProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isRentOpen, setIsRentOpen] = useState(false);

  return (
    <>
      <RentModal isOpen={isRentOpen} onClose={() => setIsRentOpen(false)} />

      <nav className="fixed w-full bg-white shadow-sm z-50">
        <Container>
          <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
            <div className="text-rose-500 font-bold text-xl">StayNest</div>

            <Search />

            <div
              onClick={() => setIsRentOpen(true)}
              className="hidden md:block text-sm font-semibold cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-full transition"
            >
              Rentiva Your Home
            </div>

            <UserMenu currentUser={currentUser} />
          </div>
        </Container>

        <Category />
      </nav>
    </>
  );
};

export default Navbar;
