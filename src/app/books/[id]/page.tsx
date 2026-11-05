
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Layers, Calendar, User, Mail } from 'lucide-react';

interface BookDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: BookDetailsProps) {
    const { id } = await params;

    let book = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books/${id}`, {
            cache: "no-store",
        });

        if (res.ok) {
            book = await res.json();
        }
    } catch (error) {
        console.error("Error fetching book details:", error);
    }

    if (!book) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-stone-700 mb-4">Book not found!</h1>
                <Link
                    href="/books"
                    className="inline-flex items-center gap-2 bg-[#254b38] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition hover:bg-[#1e3c2c]"
                >
                    <ArrowLeft size={16} /> Back to All Books
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Back Button */}
            <div className="mb-6">
                <Link
                    href="/books"
                    className="inline-flex items-center gap-2 text-stone-600 hover:text-[#254b38] text-sm font-medium transition"
                >
                    <ArrowLeft size={16} /> Back to All Books
                </Link>
            </div>

            {/* Main Card Container */}
            <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Book Image */}
                <div className="relative h-[420px] w-full bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center p-4">
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {book.genre && (
                        <span className="absolute top-4 right-4 bg-[#254b38] text-white text-xs px-3.5 py-1 rounded-full font-medium shadow-sm">
                            {book.genre}
                        </span>
                    )}
                </div>

                {/* Book Details Info */}
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
                            {book.title}
                        </h1>
                        <p className="text-base font-semibold text-[#254b38] mb-4">
                            By {book.author}
                        </p>

                        <div className="text-stone-600 text-sm leading-relaxed mb-6">
                            <p>{book.description}</p>
                        </div>

                        {/* Copies & Date Info */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-100 mb-6 text-xs text-stone-600">
                            <div className="flex items-center gap-2">
                                <Layers size={16} className="text-[#254b38]" />
                                <span>Copies Available: <strong className="text-stone-800">{book.copies}</strong></span>
                            </div>
                            {book.createdAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-stone-400" />
                                    <span>Added: {new Date(book.createdAt).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Added By Community Info */}
                        {(book.userName || book.userEmail) && (
                            <div className="bg-stone-50 p-4 rounded-2xl space-y-1.5 text-xs text-stone-600 border border-stone-100">
                                <p className="font-semibold text-stone-700 mb-1">Shared by:</p>
                                {book.userName && (
                                    <div className="flex items-center gap-2">
                                        <User size={14} className="text-stone-400" />
                                        <span>{book.userName}</span>
                                    </div>
                                )}
                                {book.userEmail && (
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-stone-400" />
                                        <span className="text-stone-500">{book.userEmail}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}