import React from 'react';
import Image from 'next/image';
import banner from "../../assets/banner.png";
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#15171d] rounded-2xl p-8 md:p-12 gap-8">

                <div className="flex flex-col max-w-xl">
                    <p className="text-[#ccff00] text-sm font-bold tracking-widest pb-3">
                        WORKOUT LIBRARY
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight text-white pb-4">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h1>
                    <p className="text-gray-400 pb-6">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <Link
                        href="#library"
                        className="self-start rounded-lg px-6 py-3 text-black font-bold bg-[#ccff00] hover:opacity-90 transition"
                    >
                        BROWSE WORKOUTS
                    </Link>
                </div>

                <div className="w-full md:w-auto flex justify-center">
                    <Image
                        className="object-contain"
                        src={banner}
                        alt="banner image"
                        height={320}
                        width={320}
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;