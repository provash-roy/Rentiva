"use client";

import Link from "next/link";
import Avatar from "../Avatar";
import { Menu, Home, Calendar, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: { image?: string | null } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
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
            {/* My Properties */}
            <DropdownMenuItem asChild>
              <Link href="/my-properties" className="flex items-center gap-2">
                <Home size={16} />
                <span>My Properties</span>
              </Link>
            </DropdownMenuItem>

            {/* My Trips */}
            <DropdownMenuItem asChild>
              <Link href="/my-trips" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>My Trips</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Logout */}
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
            {/* Login */}
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-2">
                <User size={16} />
                <span>Login</span>
              </Link>
            </DropdownMenuItem>

            {/* Sign Up */}
            <DropdownMenuItem asChild>
              <Link href="/register" className="flex items-center gap-2">
                <User size={16} />
                <span>Sign Up</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
