import {
    Brain,
    Heart,
    BookMarked,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

const ReadingBenefits = () => {
    const benefits = [
        {
            icon: Brain,
            number: "01",
            title: "Improve Knowledge",
            description:
                "Expand your knowledge, discover new ideas, and learn something valuable with every book you read.",
            color: "from-[#e8f0e9] to-[#f5f8f3]",
            iconColor: "text-[#254b38]",
        },
        {
            icon: Heart,
            number: "02",
            title: "Reduce Stress",
            description:
                "Escape the busy world for a while and enjoy a peaceful moment with your favorite book.",
            color: "from-[#f8eee5] to-[#fff8f0]",
            iconColor: "text-[#a66d45]",
        },
        {
            icon: BookMarked,
            number: "03",
            title: "Build Reading Habits",
            description:
                "Make reading a part of your daily routine and develop a lifelong love for learning.",
            color: "from-[#f0edf7] to-[#faf8ff]",
            iconColor: "text-[#75619a]",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#fffdf8] px-4 py-20 md:py-24">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#e7c692]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#254b38]/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">

                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e8dfd2] bg-[#f5f1e9] px-5 py-2 text-sm font-semibold text-[#80633d]">
                        <Sparkles size={16} />
                        Benefits of Reading
                    </span>

                    <h2 className="mt-5 text-3xl font-bold leading-tight text-[#254b38] sm:text-4xl md:text-5xl">
                        A Book Can Change
                        <span className="mt-1 block text-[#987b59]">
                            Your World
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500">
                        Every page opens a new door. Discover how reading
                        can make your life more meaningful, peaceful, and inspiring.
                    </p>

                    <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#987b59]" />
                </div>

                {/* Benefits Cards */}
                <div className="grid grid-cols-1 gap-7 md:grid-cols-3">

                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.number}
                                className={`group relative overflow-hidden rounded-3xl border border-[#e8dfd2] bg-gradient-to-br ${benefit.color} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                            >
                                {/* Decorative Number */}
                                <span className="absolute right-6 top-4 text-6xl font-black text-[#254b38]/[0.06]">
                                    {benefit.number}
                                </span>

                                {/* Icon */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                                    <Icon
                                        size={30}
                                        className={benefit.iconColor}
                                    />
                                </div>

                                {/* Content */}
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-[#254b38]">
                                        {benefit.title}
                                    </h3>

                                    <p className="mt-3 min-h-[84px] text-sm leading-7 text-gray-600">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Bottom Decoration */}
                                <div className="mt-6 flex items-center justify-between border-t border-[#254b38]/10 pt-5">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#987b59]">
                                        Read • Learn • Grow
                                    </span>

                                    <ArrowUpRight
                                        size={20}
                                        className="text-[#254b38] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default ReadingBenefits;
