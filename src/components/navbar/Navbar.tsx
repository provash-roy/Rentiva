"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Category from "./Category";
import Container from "../Container";
import RentModal from "../modals/RentModal";

const Navbar = () => {
  const [isRentOpen, setIsRentOpen] = useState(false);

  return (
    <>
      {/* Rent Modal */}
      <RentModal isOpen={isRentOpen} onClose={() => setIsRentOpen(false)} />

      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <Container>
          <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-rose-500 font-bold text-xl cursor-pointer hover:text-rose-600 transition">
              StayNest
            </div>

            {/* Search bar */}
            <div className="flex-1 mx-4">
              <Search />
            </div>

            {/* Rent Button */}
            <div
              onClick={() => setIsRentOpen(true)}
              className="hidden md:flex items-center justify-center text-sm font-semibold cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-full transition"
            >
              Rentiva Your Home
            </div>

            {/* User Menu */}
            <UserMenu />
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
