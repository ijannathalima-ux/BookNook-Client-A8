"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
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

        {/* Desktop Auth / UserInfo Section */}
        <div className="hidden md:flex items-center">
          <UserInfo />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#254b38] hover:bg-[#edf2ed] md:hidden cursor-pointer"
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

            <div className="border-t border-[#e8dfd2] pt-4">
              <UserInfo />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;