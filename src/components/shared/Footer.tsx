import Link from "next/link";
import {
    BookOpen,
    Mail,
} from "lucide-react";
import { FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="mt-20 bg-[#203b2d] text-[#f8f3e9]">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

                {/* Logo & Description */}
                <div>
                    <Link href="/" className="mb-4 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5c99b] text-[#203b2d]">
                            <BookOpen size={25} />
                        </div>

                        <span className="text-2xl font-bold">BookNook</span>
                    </Link>

                    <p className="max-w-xs text-sm leading-7 text-[#d5d0c5]">
                        A cozy corner for every book lover. Discover stories, explore
                        knowledge, and make reading a part of your everyday life.
                    </p>

                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-[#e5c99b]">
                        Quick Links
                    </h3>

                    <ul className="space-y-3 text-sm text-[#d5d0c5]">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/books" className="hover:text-white">All Books</Link></li>
                        <li><Link href="/login" className="hover:text-white">Login</Link></li>
                        <li><Link href="/register" className="hover:text-white">Register</Link></li>
                    </ul>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-[#e5c99b]">
                        Explore
                    </h3>

                    <ul className="space-y-3 text-sm text-[#d5d0c5]">
                        <li><Link href="/books" className="hover:text-white">New Arrivals</Link></li>
                        <li><Link href="/books" className="hover:text-white">Fiction</Link></li>
                        <li><Link href="/books" className="hover:text-white">Science</Link></li>
                        <li><Link href="/books" className="hover:text-white">History</Link></li>
                    </ul>
                </div>

               {/* Contact */}
                <div>
                    <h3 className="mb-5 text-lg font-semibold text-[#e5c99b]">
                        Get in Touch
                    </h3>

                    <ul className="space-y-4 text-sm text-[#d5d0c5]">
                        <li className="flex items-center gap-3">
                            <Mail size={17} className="text-[#e5c99b]" />
                            hello@booknook.com
                        </li>
                    </ul>

                    {/* Social Links Icons */}
                    <div className="mt-5 flex gap-5 font-medium text-[#d5d0c5]">
                        <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="transition hover:text-[#e5c99b]">
                            <FaFacebook size={18} />
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="transition hover:text-[#e5c99b]">
                            <BsInstagram size={18} />
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="transition hover:text-[#e5c99b]">
                            <FaLinkedinIn size={18} />
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="transition hover:text-[#e5c99b]">
                            <FaXTwitter size={18} />
                        </a>
                        <a href="https://google.com/" target="_blank" rel="noreferrer" className="transition hover:text-[#e5c99b]">
                            <FaGoogle size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/15">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-xs text-[#d5d0c5] md:flex-row lg:px-8">
                    <p>
                        © 2026 BookNook. All rights reserved.
                    </p>

                    <p>Made with care for every book lover. ♡</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
