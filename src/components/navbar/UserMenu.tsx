"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User, LogOut, Home, Calendar } from "lucide-react";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <div
        onClick={toggleMenu}
        className="flex items-center gap-3 p-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <Menu size={20} />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-md overflow-hidden text-sm">
          {currentUser ? (
            <>
              <MenuItem icon={<Home size={16} />} label="My Properties" />
              <MenuItem icon={<Calendar size={16} />} label="My Trips" />
              <MenuItem icon={<LogOut size={16} />} label="Logout" />
            </>
          ) : (
            <>
              <MenuItem icon={<User size={16} />} label="Login" />
              <MenuItem icon={<User size={16} />} label="Sign Up" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default UserMenu;
