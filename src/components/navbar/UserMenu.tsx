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
              alt="User profile"
              className="grayscale hover:grayscale-0 transition"
            />
            <AvatarFallback>
              {currentUser?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
            flex items-center gap-2
            p-2
            border border-gray-300
            rounded-full
            hover:shadow-md
            transition
            cursor-pointer
          "
          >
            <Menu size={20} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 rounded-xl">
          {status === "loading" && (
            <div className="p-2 text-center text-sm text-gray-500">
              Loading...
            </div>
          )}

          {currentUser ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/my-properties" className="flex items-center gap-2">
                  <Home size={16} />
                  My Properties
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/my-trips" className="flex items-center gap-2">
                  <Calendar size={16} />
                  My Trips
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-red-500 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <User size={16} />
                  Login
                </Link>
              </DropdownMenuItem>

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
