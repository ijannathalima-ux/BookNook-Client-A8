
"use client";

import Link from "next/link";
import { useState } from "react";

import {
  BookOpen,
  Menu,
  X,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const user = null;

  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    ...(user
      ? [
        { name: "Add Book", href: "/add-book" },
        { name: "My Books", href: "/my-books" },
        { name: "My Borrows", href: "/my-borrows" },
      ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dfd2] bg-[#fffdf8]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#254b38] text-[#fff8e9]">
            <BookOpen size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#254b38]">
              BookNook
            </h1>
            <p className="text-[10px] tracking-[2px] text-[#987b59]">
              YOUR READING CORNER
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#514b40] transition hover:text-[#254b38]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#e8dfd2] px-3 py-2 text-[#254b38]"
              >
                <UserRound size={18} />
                <span className="text-sm">My Account</span>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 rounded-xl border border-[#e8dfd2] bg-white p-2 shadow-lg">
                  <Link
                    href="/profile"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f5f0e7]"
                  >
                    My Profile
                  </Link>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Login Button */}
              <Button
                variant="outline"
                className="border-[#254b38] text-[#254b38] hover:bg-[#edf2ed]"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>

              {/* Register Button */}
              <Button
                className="bg-[#254b38] text-white hover:bg-[#193829]"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#254b38] hover:bg-[#edf2ed] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#e8dfd2] bg-[#fffdf8] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-medium text-[#514b40] hover:text-[#254b38]"
              >
                {link.name}
              </Link>
            ))}

            {!user && (
              <div className="flex gap-3 border-t border-[#e8dfd2] pt-4">
                <Button variant="outline" className="flex-1 border-[#254b38] text-[#254b38]" asChild>
                  <Link href="/login">Login</Link>
                </Button>

                <Button className="flex-1 bg-[#254b38] hover:bg-[#193829]" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
