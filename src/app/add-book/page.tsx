"use client";

import { useState } from "react";
import { BookPlus, Image as ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getTokenClient } from "@/lib/getTokenClient";

export default function AddBookPage() {

    const [loading, setLoading] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session?.user) {
            toast.error("Please login first!");
            return;
        }

        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const bookData = {
            ...Object.fromEntries(formData.entries()),
            copies: Number(formData.get("copies")),
            userName: session.user.name,
            userEmail: session.user.email,
            createdAt: new Date().toISOString(),
        };

        const token = await getTokenClient();
        if (!token) {
            toast.error("Session expired! Please login again.");
            setLoading(false);
            return;
        }

        try {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(bookData),
                }
            );

            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.message || "Failed to add book!");
            }

            toast.success("Book added successfully!");
            form.reset();

            console.log(data);

        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#254b38]/10 text-[#254b38]">
                        <BookPlus size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#254b38]">Add New Book</h1>
                        <p className="text-sm text-stone-500">
                            Share a new book with the BookNook library community.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title & Author */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Book Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. The Alchemist"
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Author Name
                            </label>
                            <input
                                type="text"
                                name="author"
                                required
                                placeholder="e.g. Paulo Coelho"
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                    </div>

                    {/* Genre & Copies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Genre / Category
                            </label>
                            <select
                                name="genre"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm bg-white"
                            >
                                <option value="">Select Genre</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Kids">Kids</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Number of Copies
                            </label>
                            <input
                                type="number"
                                name="copies"
                                min="1"
                                required
                                placeholder="e.g. 5"
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                            <ImageIcon size={16} /> Cover Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            required
                            placeholder="Image direct link here..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            required
                            placeholder="Write a brief summary of the book..."
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm resize-none"
                        ></textarea>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                User Name
                            </label>
                            <input
                                type="text"
                                name="userName"
                                value={session?.user?.name || ""}
                                readOnly
                                placeholder="User Name"
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                User Email
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                value={session?.user?.email || ""}
                                readOnly
                                placeholder="Email"
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                    </div>


                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading || isPending}
                        className="w-full bg-[#254b38] text-white hover:bg-[#193829] py-3 rounded-xl font-medium shadow-md transition flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                        {loading ? "Adding Book..." : "Add Book to Library"}
                    </Button>
                </form>
            </div>
        </div>
    );
}