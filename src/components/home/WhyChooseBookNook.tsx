import {
    BookOpen,
    Search,
    Clock,
    Sparkles,
} from "lucide-react";

const WhyChooseBookNook = () => {
    const features = [
        {
            icon: BookOpen,
            title: "Easy Borrowing",
            description:
                "Borrow your favorite books easily and enjoy reading without any hassle.",
        },
        {
            icon: Search,
            title: "Explore Collection",
            description:
                "Discover interesting books from different genres and explore new ideas.",
        },
        {
            icon: Clock,
            title: "Reading Anytime",
            description:
                "Find your next favorite book and enjoy your reading journey at your own pace.",
        },
    ];

    return (
        <section className="bg-[#f5f1e9] px-4 py-16 md:py-20">
            <div className="mx-auto max-w-7xl">

                <div className="mb-12 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#254b38]/10 px-4 py-2 text-sm font-semibold text-[#254b38]">
                        <Sparkles size={16} />
                        Why BookNook?
                    </span>

                    <h2 className="mt-4 text-3xl font-bold text-[#254b38] md:text-4xl">
                        Your Reading Journey Starts Here
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                        Discover a simple and enjoyable way to explore,
                        borrow, and manage your favorite books.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-2xl border border-[#e8dfd2] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#254b38]/10 text-[#254b38] transition group-hover:bg-[#254b38] group-hover:text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-[#254b38]">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseBookNook;
