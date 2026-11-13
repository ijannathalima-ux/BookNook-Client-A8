"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Successfully logged out!");
                        router.push("/login");
                    },
                },
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to log out.");
        }
    };

    return (
        <div>
            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 rounded-lg p-2 hover:bg-stone-100 transition cursor-pointer"
                    >
                         {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={32}
                                height={32}
                                className="rounded-full object-cover w-8 h-8 border border-stone-200"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#254b38] text-sm font-bold text-white">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )} 

                        <span className="text-sm font-semibold text-stone-800 hidden md:inline">
                            {user.name}
                        </span>

                        <IoMdArrowDropdown className={`text-stone-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl">
                            <div className="border-b border-stone-100 pb-3">
                                <p className="font-semibold text-stone-900 text-sm">
                                    {user.name}
                                </p>
                                <p className="mt-1 truncate text-xs text-stone-500">
                                    {user.email}
                                </p>
                            </div>

                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 mb-2 block rounded-lg px-2 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 transition cursor-pointer"
                            >
                                👤 My Profile
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 w-full rounded-lg px-2 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50 transition cursor-pointer"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/login"
                        className="text-xs sm:text-sm font-semibold text-stone-700 hover:text-[#254b38] px-3 py-2 transition"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-xl bg-[#254b38] hover:bg-[#1e3c2c] px-4 py-2 text-xs sm:text-sm font-medium text-white transition shadow-sm"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;