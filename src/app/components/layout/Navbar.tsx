import React from 'react';
import Image from 'next/image';
import logo from "../../../assets/logo.png";
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-[#0c0c0f] px-8 py-5">
            <div className="flex justify-between items-center">

                <div className="flex items-center gap-2">
                    <Image
                        className="object-contain"
                        src={logo}
                        alt="Fitlog logo"
                        height={26}
                        width={26}
                    />

                    <h1 className="font-bold text-xl text-white tracking-wide uppercase">
                        FITLOG
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="px-4 py-1.5 rounded-full bg-lime-900/40 text-lime-400 font-semibold"
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className="text-gray-400 hover:text-white transition font-medium"
                    >
                        My Plan
                    </Link>
                </div>

                <div className="flex items-center gap-5">
                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-white font-semibold">Plan</span>
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ccff00] text-black text-xs font-bold">
                            0
                        </span>
                    </Link>

                    <Link href="/my-plan" className="flex items-center gap-2">
                        <span className="text-white font-semibold">Saved</span>
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-500 text-white text-xs font-bold">
                            0
                        </span>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;