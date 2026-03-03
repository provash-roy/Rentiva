"use client";

import { useState } from "react";
import UserMenu from "./UserMenu";
import Search from "./Search";
import AuthModal from "../modals/AuthModal";

interface NavbarProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-rose-500 font-bold text-xl">StayNest</div>

          <Search />

          <UserMenu
            currentUser={currentUser}
            onLoginOpen={() => setIsLoginOpen(true)}
            onRegisterOpen={() => setIsRegisterOpen(true)}
          />
        </div>
      </nav>

      {/* Modals */}
      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        variant="login"
      />

      <AuthModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        variant="register"
      />
    </>
  );
};

export default Navbar;
