const Navbar = () => {
    return (
        <nav className={`flex justify-end w-full z-10 p-10 text-white text-2xl`}>
            <ul className={"flex flex-row gap-10"}>
                <li>Sign Up</li>
                <li>Help Out</li>
                <li>Project Roadmap</li>
            </ul>
        </nav>
    );
};

export default Navbar;