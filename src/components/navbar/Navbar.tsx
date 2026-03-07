"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import Search from "./Search";
import Category from "./Category";
import Container from "../Container";
import RentModal from "../modals/RentModal";
import { Button } from "../ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isRentOpen, setIsRentOpen] = useState(false);

  return (
    <>
      <RentModal isOpen={isRentOpen} onClose={() => setIsRentOpen(false)} />

      <nav className="fixed w-full bg-white shadow-sm z-50">
        <Container>
          <div className="flex justify-between items-center h-16">
            <div>
              <Logo />
            </div>

            <div>
              <Search />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => setIsRentOpen(true)}>
                Rent Your Home
              </Button>
              <UserMenu />
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
