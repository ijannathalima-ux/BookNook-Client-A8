import Image from "next/image";
import Link from "next/link";
import { BookOpen, User, Mail, Calendar, Layers } from "lucide-react";

interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    copies: number | string;
    image: string;
    description: string;
    userName?: string;
    userEmail?: string;
    createdAt?: string;
}

export default async function AllBooksPage() {
    let books: Book[] = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books`, {
            cache: "no-store",
        });
        books = await res.json();
    } catch (error) {
        console.error("Error fetching books:", error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-[#254b38] mb-2">All Library Books</h1>
                <p className="text-stone-500 text-sm">
                    Explore our collection of books shared by the community.
                </p>
            </div>

            {/* Books Grid */}
            {books.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
                    <p className="text-stone-500">No books found in the library.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300"
                        >
                            <div>
                                <div className="relative h-64 w-full bg-stone-100 p-4 flex items-center justify-center">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        fill
                                        className="object-contain p-2"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <span className="absolute top-3 right-3 bg-[#254b38] text-white text-xs px-3 py-1 rounded-full font-medium shadow z-10">
                                        {book.genre}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-stone-800 mb-1 line-clamp-1">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm font-medium text-[#254b38] mb-3">
                                        By {book.author}
                                    </p>
                                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                                        {book.description}
                                    </p>

                                    {/* Copies & Metadata */}
                                    <div className="flex items-center justify-between text-xs text-stone-500 pb-4 mb-4 border-b border-stone-100">
                                        <div className="flex items-center gap-1.5">
                                            <Layers size={14} className="text-[#254b38]" />
                                            <span>Copies: <strong>{book.copies}</strong></span>
                                        </div>
                                        {book.createdAt && (
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-stone-400" />
                                                <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Added By Info */}
                                    {(book.userName || book.userEmail) && (
                                        <div className="bg-stone-50 p-3 rounded-xl space-y-1 text-xs text-stone-600">
                                            {book.userName && (
                                                <div className="flex items-center gap-2">
                                                    <User size={13} className="text-stone-400" />
                                                    <span className="font-medium truncate">{book.userName}</span>
                                                </div>
                                            )}
                                            {book.userEmail && (
                                                <div className="flex items-center gap-2">
                                                    <Mail size={13} className="text-stone-400" />
                                                    <span className="text-stone-500 truncate">{book.userEmail}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="p-5 pt-0">
                                <Link
                                    href={`/books/${book._id}`}
                                    className="w-full bg-[#254b38]/10 hover:bg-[#254b38] text-[#254b38] hover:text-white py-2.5 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2"
                                >
                                    <BookOpen size={16} /> View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}