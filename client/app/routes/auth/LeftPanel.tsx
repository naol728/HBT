import React from "react";

export default function LeftPanel() {
    const features = [
        {
            title: "25% on every course sale you make",
            sub: "Keep a quarter of every package you sell",
        },
        {
            title: "Build a team, earn 5% more",
            sub: "Invite 4 members and become a Team Leader",
        },
        {
            title: "100% practical course content",
            sub: "Marketing, sales, mindset, leadership",
        },
        {
            title: "Free training & support",
            sub: "Video guides, mentor access, mobile app",
        },
    ];

    return (
        <div
            className="
                relative
                hidden
                lg:flex
                flex-1
                min-h-screen
                overflow-hidden
            "
        >
            {/* Background */}
            <div
                className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    bg-[url('/logo.jpg')]
                "
            />


            {/* Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-black/50
                "
            />


            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    flex
                    items-end
                    w-full
                    min-h-screen
                    p-8
                    xl:p-12
                "
            >

                <div className="max-w-xl">

                    <span
                        className="
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-white/20
                            bg-white/10
                            backdrop-blur-md
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-primary
                        "
                    >
                        Powered by TalentBridge Ethiopia
                    </span>



                    <h2
                        className="
                            mt-6
                            mb-4
                            text-3xl
                            xl:text-5xl
                            font-bold
                            leading-tight
                            text-white
                        "
                    >
                        Start Earning From{" "}
                        <span className="text-primary">
                            HBT Courses
                        </span>
                    </h2>



                    <p
                        className="
                            max-w-lg
                            text-sm
                            xl:text-base
                            leading-relaxed
                            text-white/70
                        "
                    >
                        No experience needed. Sell practical course packages,
                        build your team, and grow into a leader — we support
                        you at every step.
                    </p>



                    {/* Features */}
                    <div
                        className="
                            mt-8
                            flex
                            flex-col
                            gap-5
                        "
                    >

                        {features.map((item, i) => (
                            <div
                                key={i}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-primary/20
                                        text-primary
                                        font-bold
                                    "
                                >
                                    ✓
                                </div>


                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        {item.title}
                                    </p>


                                    <p
                                        className="
                                            text-xs
                                            text-white/60
                                        "
                                    >
                                        {item.sub}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}