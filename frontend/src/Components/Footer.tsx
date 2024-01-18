const Footer = () => {
    return (
        <div className="bg-blue-800 py-10">
            <div className="container flex justify-between items-center">
                <span className="text-3xl font-bold text-white tracking-tighter">
                    MernBooking
                </span>
                <span className="text-white font-bold tracking-tighter flex justify-end gap-4 items-center">
                    <p className="cursor-pointer">Privacy policy</p>
                    <p className="cursor-pointer">Terms of service</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;
