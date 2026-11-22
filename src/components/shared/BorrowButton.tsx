
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { getTokenClient } from "@/lib/getTokenClient";

interface BorrowButtonProps {
    bookId: string;
    title: string;
    image: string;
    copies: number;
}

export default function BorrowButton({ bookId, title, image, copies }: BorrowButtonProps) {

    const { data: session } = authClient.useSession();

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const today = new Date();

    const borrowDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const returnDay = new Date(today);
    returnDay.setDate(returnDay.getDate() + 7);

    const returnDate = [
        returnDay.getFullYear(),
        String(returnDay.getMonth() + 1).padStart(2, "0"),
        String(returnDay.getDate()).padStart(2, "0"),
    ].join("-");

    const handleBorrow = async () => {
        if (!session?.user) {
            toast.error("Please login first!");
            return;
        }

        setLoading(true);

        const token = await getTokenClient()
        try {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/borrows`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bookId,
                        bookTitle: title,
                        bookImage: image,
                        userName: session.user.name,
                        userEmail: session.user.email,
                        borrowDate,
                        returnDate,
                    }),
                }
            );

            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.message || "Failed to borrow book!");
            }

            toast.success("Book borrowed successfully!");
            setIsOpen(false);

        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    if (copies <= 0) {
        return (
            <Button disabled>
                Not Available
            </Button>
        );
    }

    return (
        <>
            <Button
                className="bg-[#254b38]"
                onClick={() => {
                    if (!session?.user) {
                        toast.error("Please login first!");
                        return;
                    }
                    setIsOpen(true);
                }}
            >
                Borrow this book
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                        <h2 className="mb-2 text-xl font-bold text-[#254b38]">
                            Borrow {title}
                        </h2>

                        <p className="mb-6 text-sm text-stone-500">
                            You can keep this book for 7 days.
                        </p>

                        <div className="space-y-4 mb-6">

                            <div>
                                <p className="text-sm font-semibold text-stone-700 mb-1">
                                    User Name
                                </p>
                                <p className="text-sm text-stone-600">
                                    {session?.user.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-stone-700 mb-1">
                                    User Email
                                </p>
                                <p className="text-sm text-stone-600 break-all">
                                    {session?.user.email}
                                </p>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3">

                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleBorrow}
                                disabled={loading}
                                className="bg-[#254b38] hover:bg-[#1e3c2c]"
                            >
                                {loading ? "Borrowing..." : "Confirm Borrow"}
                            </Button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
