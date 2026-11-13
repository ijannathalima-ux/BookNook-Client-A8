"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Pencil, Image as ImageIcon } from "lucide-react";

interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    copies: number;
    image: string;
    description: string;
    userName: string;
    userEmail: string;
}

export default function EditBookPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch book");
                }

                const data = await response.json();
                setBook(data);

            } catch (error) {
                console.error(error);
                toast.error("Could not load book!");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBook();
        }
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!book) return;

        setBook({
            ...book,
            [e.target.name]: e.target.name === "copies"
                ? Number(e.target.value)
                : e.target.value,
        });
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!book) return;

        setUpdating(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(book),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update book");
            }

            toast.success("Book updated successfully!");
            router.push("/my-books");
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Failed to update book!");
        } finally {
            setUpdating(false);
        }
    };

    if (isPending || loading) {
        return <div className="text-center py-20">Loading book...</div>;
    }

    if (!session?.user) {
        return (
            <div className="text-center py-20">
                Please login first.
                <Button onClick={() => router.push("/login")}>
                    Login
                </Button>
            </div>
        );
    }

    if (!book) {
        return <div className="text-center py-20">Book not found!</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#254b38]/10 text-[#254b38]">
                        <Pencil size={24} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-[#254b38]">
                            Edit Book
                        </h1>
                        <p className="text-sm text-stone-500">
                            Update your book information in BookNook.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Title & Author */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Book Title
                            </label>
                            <input
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Author Name
                            </label>
                            <input
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                required
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
                                value={book.genre}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm bg-white"
                            >
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
                                min="0"
                                value={book.copies}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">
                            <span className="flex items-center gap-1.5">
                                <ImageIcon size={16} />
                                Cover Image URL
                            </span>
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={book.image}
                            onChange={handleChange}
                            required
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
                            value={book.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#254b38]/20 focus:border-[#254b38] text-sm resize-none"
                        />
                    </div>

                    {/* User Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                User Name
                            </label>
                            <input
                                value={book.userName}
                                readOnly
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                User Email
                            </label>
                            <input
                                value={book.userEmail}
                                readOnly
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-[#254b38] text-white hover:bg-[#193829] py-3 rounded-xl font-medium shadow-md transition flex items-center justify-center gap-2"
                    >
                        <Pencil size={18} />
                        {updating ? "Updating Book..." : "Update Book"}
                    </Button>

                </form>
            </div>
        </div>
    );
}
