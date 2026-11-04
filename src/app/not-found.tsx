import Link from "next/link";
import { BookX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center bg-[#fffdf8]">
            {/* Icon Wrapper */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#254b38]/10 text-[#254b38] mb-6 shadow-sm">
                <BookX size={42} />
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-6xl font-extrabold tracking-tight text-[#254b38] mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-[#3d362c] mb-3">Page Not Found</h2>

            <p className="max-w-md text-sm text-[#736a5a] mb-8 leading-relaxed">
                Oops! It looks like the page or book you are looking for has been misplaced or doesn&apos;t exist in our library shelf.
            </p>

            {/* Back to Home Button */}
            <Button
                asChild
                className="bg-[#254b38] text-white hover:bg-[#193829] px-6 py-6 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
                <Link href="/" className="flex items-center gap-2 text-base font-medium">
                    <Home size={18} />
                    Back to Home
                </Link>
            </Button>
        </div>
    );
}