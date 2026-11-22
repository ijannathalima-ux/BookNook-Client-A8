
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { getTokenClient } from "@/lib/getTokenClient";

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
    createdAt: string;
}

export default function MyBooksPage() {
    const { data: session, isPending } = authClient.useSession();

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);


    const handleDelete = async () => {
        if (!selectedBookId) return;

        setDeleting(true);

        const token = await getTokenClient()
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${selectedBookId}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete book.");
            }

            setBooks((previousBooks) =>
                previousBooks.filter((book) => book._id !== selectedBookId)
            );

            toast.success("Book deleted successfully!");
            setSelectedBookId(null);

        } catch (error) {
            console.error(error);
            toast.error("Could not delete the book.");
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        const fetchMyBooks = async () => {
            if (isPending) return;

            if (!session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books?userEmail=${encodeURIComponent(session.user.email)}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Failed to load your books.");
                }

                const data = await response.json();
                setBooks(data);

            } catch (error) {
                console.error(error);
                toast.error("Could not load your books.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyBooks();
    }, [session, isPending]);

    if (isPending || loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p className="text-[#254b38] font-medium">
                    Loading your books...
                </p>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
                <BookOpen size={45} className="text-[#254b38]" />
                <h2 className="text-xl font-bold">Please Login First</h2>
                <Link href="/login">
                    <Button className="bg-[#254b38] hover:bg-[#193829]">
                        Login
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#254b38]">
                    My Books
                </h1>
                <p className="text-stone-500 mt-2">
                    Manage the books you have added to BookNook.
                </p>
            </div>

            {books.length === 0 ? (
                <div className="text-center py-16 border rounded-2xl">
                    <BookOpen
                        size={48}
                        className="mx-auto text-stone-400 mb-4"
                    />
                    <h2 className="text-xl font-semibold text-stone-700">
                        No Books Added Yet
                    </h2>
                    <p className="text-stone-500 mt-2">
                        Start sharing your favorite books with the community.
                    </p>
                    <Link href="/add-book">
                        <Button className="mt-5 bg-[#254b38] hover:bg-[#193829]">
                            Add Your First Book
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="flex flex-col sm:flex-row gap-5 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
                        >
                            <div className="relative w-full sm:w-36 h-48 sm:h-44 shrink-0 bg-stone-100 rounded-xl overflow-hidden">
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row flex-1 justify-between gap-4">
                                <div>
                                    <span className="text-xs font-semibold text-[#254b38] bg-[#254b38]/10 px-3 py-1 rounded-full">
                                        {book.genre}
                                    </span>

                                    <h2 className="text-xl font-bold text-stone-800 mt-3">
                                        {book.title}
                                    </h2>

                                    <p className="text-sm text-stone-500 mt-1">
                                        By {book.author}
                                    </p>

                                    <p className="text-sm text-stone-600 mt-3 line-clamp-2">
                                        {book.description}
                                    </p>

                                    <p className="text-sm font-medium text-[#254b38] mt-3">
                                        Available Copies: {book.copies}
                                    </p>
                                </div>

                                <div className="flex sm:flex-col gap-3 sm:justify-center sm:items-end">
                                    <Link href={`/my-books/${book._id}/edit`}>
                                        <Button
                                            variant="outline"
                                            className="border-[#254b38] text-[#254b38]"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        variant="outline"
                                        className="border-red-200 text-red-500"
                                        onClick={() => setSelectedBookId(book._id)}
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedBookId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl p-7 shadow-xl">

                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={27} className="text-red-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-center text-[#254b38]">
                            Delete Book?
                        </h2>

                        <p className="text-stone-500 text-center mt-3">
                            Are you sure you want to delete this book?
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-3 mt-7">
                            <Button
                                variant="outline"
                                className="flex-1"
                                disabled={deleting}
                                onClick={() => setSelectedBookId(null)}
                            >
                                Cancel
                            </Button>

                            <Button
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                disabled={deleting}
                                onClick={handleDelete}
                            >
                                {deleting ? "Deleting..." : "Yes, Delete"}
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
