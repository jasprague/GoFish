import Button from "../button/Button";

const Navbar = () => {
    return (
        <nav className={`flex justify-end w-full z-10 p-10 text-white text-2xl`}>
            <ul className={"flex flex-row gap-10"}>
               <Button text="Donate" link="https://www.paypal.com/donate?token=1K3uR2fNb5z1-dRLYrkQmh7J2EuzzLpgVtgayLhGBQtKLpgRZVZ7zAWEyR0r2glvO9h_Tehuu5oQkpcA" variant="alt" />
            </ul>
        </nav>
    );
};

export default Navbar;