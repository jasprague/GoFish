const Navbar = () => {
    return (
        <nav className={`flex justify-end w-full z-10 p-10 text-white text-2xl`}>
            <ul className={"flex flex-row gap-10"}>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="business" value="8Z5MSLWPV4JWU" />
<input type="hidden" name="no_recurring" value="0" />
<input type="hidden" name="item_name" value="Your donation will be used to fund the development of the Go Fish application." />
<input type="hidden" name="currency_code" value="USD" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
            </ul>
        </nav>
    );
};

export default Navbar;