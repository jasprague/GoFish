'use client';

import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <nav className={`flex justify-end w-full z-10 p-10 text-white text-2xl ${isHomePage ? "absolute top-0 left-0" : ""}`}>
            <ul className={"flex flex-row gap-10"}>
                <li>Sign Up</li>
                <li>Help Out</li>
                <li>Project Roadmap</li>
            </ul>
        </nav>
    );
};

export default Navbar;