"use client";

import Link from "next/link";
import { Menu, Home, Calendar, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user;

  return (
    <div className="flex items-center gap-2">
      {currentUser && (
        <Link href="/profile">
          <Avatar className="hidden md:block cursor-pointer">
            <AvatarImage
              src={currentUser?.image || ""}
              alt={`${currentUser?.name}'s profile`}
              className="grayscale hover:grayscale-0 transition"
            />
            <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
      )}

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-full cursor-pointer hover:shadow-md transition">
            <Menu size={20} />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 rounded-xl">
          {status === "loading" && (
            <div className="p-2 text-center text-sm text-gray-500">
              Loading...
            </div>
          )}

          {currentUser ? (
            <>
              {/* My Properties */}
              <DropdownMenuItem asChild>
                <Link href="/my-properties" className="flex items-center gap-2">
                  <Home size={16} />
                  My Properties
                </Link>
              </DropdownMenuItem>

              {/* My Trips */}
              <DropdownMenuItem asChild>
                <Link href="/my-trips" className="flex items-center gap-2">
                  <Calendar size={16} />
                  My Trips
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 text-red-500 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {/* Login */}
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <User size={16} />
                  Login
                </Link>
              </DropdownMenuItem>

              {/* Register */}
              <DropdownMenuItem asChild>
                <Link href="/register" className="flex items-center gap-2">
                  <User size={16} />
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
