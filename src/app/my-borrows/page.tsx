"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { getTokenClient } from "@/lib/getTokenClient";

interface Borrow {
    _id: string;
    bookId: string;
    bookTitle: string;
    bookImage: string;
    userName: string;
    userEmail: string;
    borrowDate: string;
    returnDate: string;
}

export default function MyBorrowsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [borrows, setBorrows] = useState<Borrow[]>([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session?.user?.email) return;

        const fetchBorrows = async () => {
            try {
                const token = await getTokenClient()
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows?userEmail=${encodeURIComponent(session.user.email)}`,
                    {
                        cache: "no-store",
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to load borrowed books!");
                }

                const data = await res.json();
                setBorrows(data);
            } catch (error) {
                console.error(error);
                toast.error("Could not load borrowed books!");
            } finally {
                setLoading(false);
            }
        };

        fetchBorrows();
    }, [session, isPending]);

    const handleReturn = async (borrowId: string) => {
        setReturningId(borrowId);

        try {
            const token = await getTokenClient()
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows/${borrowId}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to return book!");
            }

            setBorrows((previous) =>
                previous.filter((borrow) => borrow._id !== borrowId)
            );

            toast.success("Book returned successfully!");
        } catch (error) {
            console.error(error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setReturningId("");
        }
    };


    if (isPending) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-[#254b38]">
                Loading borrowed books...
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
                <p className="text-stone-600">Please login to see your borrowed books.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-[#254b38]">
                Loading borrowed books...
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
                <p className="text-stone-600">Please login to see your borrowed books.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#254b38] mb-2">
                    My Borrows
                </h1>
                <p className="text-stone-500 text-sm">
                    Books you are reading right now.
                </p>
            </div>

            {borrows.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
                    <BookOpen className="mx-auto mb-3 text-stone-400" size={40} />
                    <h2 className="text-lg font-semibold text-stone-700">
                        No borrowed books yet!
                    </h2>
                    <p className="text-sm text-stone-500 mt-2">
                        Visit the library and borrow your favorite book.
                    </p>
                </div>
            ) : (

                <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <table className="w-full min-w-[750px] text-left">
                        <thead className="bg-[#254b38] text-white">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold">Image</th>
                                <th className="px-6 py-4 text-sm font-semibold">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold">Borrow Date</th>
                                <th className="px-6 py-4 text-sm font-semibold">Return Date</th>
                                <th className="px-6 py-4 text-sm font-semibold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {borrows.map((borrow) => (
                                <tr
                                    key={borrow._id}
                                    className="border-b border-stone-100 hover:bg-stone-50 transition"
                                >
                                    <td className="px-6 py-4">
                                        <Image
                                            src={borrow.bookImage}
                                            width={400}
                                            height={400}
                                            alt={borrow.bookTitle}
                                            className="w-16 h-20 object-contain rounded-lg bg-stone-100"
                                        />
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-stone-800">
                                            {borrow.bookTitle}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-stone-600">
                                        {new Date(`${borrow.borrowDate}T00:00:00`).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-stone-600">
                                        {new Date(`${borrow.returnDate}T00:00:00`).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleReturn(borrow._id)}
                                            disabled={returningId === borrow._id}
                                            className="bg-[#254b38] hover:bg-[#1e3c2c] disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                                        >
                                            {returningId === borrow._id
                                                ? "Returning..."
                                                : "Return Book"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
}
