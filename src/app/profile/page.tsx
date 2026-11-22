"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    LuCornerDownLeft,
    LuUserRound,
    LuMail,
    LuBookOpen,
    LuShieldCheck,
    LuPencil,
} from "react-icons/lu";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedName = name.trim();

        if (!updatedName) {
            toast.error("Name cannot be empty!");
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                toast.error(error.message || "Failed to update profile!");
                return;
            }

            toast.success("Your profile has been updated successfully!");
            setName("");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully signed out!");
                    router.push("/login");
                },
                onError: () => {
                    toast.error("Failed to sign out. Please try again!");
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className="flex min-h-[65vh] items-center justify-center bg-[#fffdf8]">
                <p className="animate-pulse font-medium text-[#254b38]">
                    Loading your profile...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-[#fffdf8]">
                <LuUserRound size={40} className="text-[#254b38]" />
                <p className="text-stone-600">
                    Please login to view your profile.
                </p>
                <button
                    onClick={() => router.push("/login")}
                    className="rounded-xl bg-[#254b38] px-6 py-2.5 font-semibold text-white transition hover:bg-[#1e3c2c]"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-[75vh] bg-[#fffdf8] px-4 py-12 sm:py-16">
            <div className="mx-auto max-w-3xl">

                {/* Page Heading */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#254b38]/10 text-[#254b38]">
                        <LuBookOpen size={28} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#254b38] sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-stone-500 sm:text-base">
                        Your personal space at BookNook.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-[#e8dfd2] bg-white shadow-sm">

                    <div className="h-28 bg-gradient-to-r from-[#254b38] via-[#315e45] to-[#987b59] sm:h-36" />

                    <div className="relative px-6 pb-7 sm:px-9">

                        <div className="-mt-12 flex flex-col items-center justify-between gap-5 sm:-mt-14 sm:flex-row">

                            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">

                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "User"}
                                        width={104}
                                        height={104}
                                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md sm:h-28 sm:w-28"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#254b38] text-4xl font-bold text-white shadow-md sm:h-28 sm:w-28">
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}

                                <div className="text-center sm:mt-12 sm:text-left">
                                    <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                                        {user.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-stone-500">
                                        BookNook Member
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="mt-2 flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 sm:mt-12"
                            >
                                <LuCornerDownLeft size={17} />
                                Sign Out
                            </button>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            <div className="flex items-center gap-3 rounded-2xl bg-[#fffdf8] p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#254b38]/10 text-[#254b38]">
                                    <LuMail size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-stone-500">
                                        Email Address
                                    </p>
                                    <p className="truncate text-sm font-semibold text-stone-800">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl bg-[#fffdf8] p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#254b38]/10 text-[#254b38]">
                                    <LuShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-stone-500">
                                        Account Status
                                    </p>
                                    <p className="text-sm font-semibold text-[#254b38]">
                                        Active Member
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Update Information */}
                <div className="mt-7 rounded-3xl border border-[#e8dfd2] bg-white p-6 shadow-sm sm:p-9">

                    <div className="mb-7 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#254b38]/10 text-[#254b38]">
                            <LuPencil size={20} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#254b38]">
                                Account Information
                            </h2>
                            <p className="text-sm text-stone-500">
                                Update your personal details.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                Full Name
                            </label>

                            <div className="relative">
                                <LuUserRound
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                                />

                                <input
                                    type="text"
                                    value={name || user.name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-stone-200 bg-[#fffdf8] py-3.5 pl-12 pr-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#254b38] focus:ring-2 focus:ring-[#254b38]/10"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-stone-700">
                                Email Address
                            </label>

                            <div className="relative">
                                <LuMail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                                />

                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full cursor-not-allowed rounded-xl border border-stone-200 bg-stone-100 py-3.5 pl-12 pr-4 text-sm text-stone-500 outline-none"
                                />
                            </div>

                            <p className="mt-2 text-xs text-stone-400">
                                Email address cannot be changed here.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                !name.trim() ||
                                name.trim() === user.name
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#254b38] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e3c2c] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LuPencil size={17} />
                            {loading ? "Updating..." : "Update Profile"}
                        </button>

                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-stone-400">
                    Thank you for being a part of BookNook.
                </p>

            </div>
        </div>
    );
};

export default ProfilePage;
