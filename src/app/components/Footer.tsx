import React from 'react';
import Image from 'next/image';
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <footer className="px-8 py-5 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
                <div className="flex items-center gap-2">
                    <Image
                        className="object-contain"
                        src={logo}
                        alt="Fitlog logo"
                        height={24}
                        width={24}
                    />
                    <span className="text-white tracking-wide uppercase font-semibold">
                        FITLOG
                    </span>
                </div>

                <p className="text-gray-500 text-sm">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;