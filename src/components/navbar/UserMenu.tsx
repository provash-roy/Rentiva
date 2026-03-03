"use client";

import { signOut } from "next-auth/react";
import Avatar from "../Avatar";
import { Menu, Home, Calendar, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  currentUser?: {
    name?: string | null;
    image?: string | null;
  } | null;
  onLoginOpen: () => void;
  onRegisterOpen: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  onLoginOpen,
  onRegisterOpen,
}) => {
  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 p-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md transition">
          <Menu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg">
        {currentUser ? (
          <>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Home size={16} />
              <span>My Properties</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Calendar size={16} />
              <span>My Trips</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex items-center gap-2 text-red-500 cursor-pointer"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={onLoginOpen}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User size={16} />
              <span>Login</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onRegisterOpen}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User size={16} />
              <span>Sign Up</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
