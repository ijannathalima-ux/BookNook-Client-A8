
import Image from "next/image";
import Link from "next/link";

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

async function LatestBooks() {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/books?limit=6`,
        {
            cache: "no-store",
        }
    );

    const latestBooks = await res.json();
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#254b38]">
                        Latest Books
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Discover the latest books in our library
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestBooks.map((book: Book) => (
                        <div
                            key={book._id}
                            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={book.image}
                                width={300}
                                height={300}
                                alt={book.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5">
                                <h3 className="text-xl font-bold text-[#254b38]">
                                    {book.title}
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Author: {book.author}
                                </p>

                                <p className="text-gray-500">
                                    Genre: {book.genre}
                                </p>

                                <Link
                                    href={`/books/${book._id}`}
                                    className="inline-block mt-4 bg-[#254b38] text-white px-5 py-2 rounded-lg"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/books"
                        className="inline-block bg-[#e7c692] text-white px-6 py-3 rounded-lg"
                    >
                        See All Books →
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default LatestBooks;
