import { Link } from "react-router-dom";
import { useAppContext } from "../Contexts/AppContext";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">MernBooking.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/my-bookings"
                                className="flex bg-white text-blue-600 hover:bg-gray-100 px-3 font-bold items-center"
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/my-hotels"
                                className="flex bg-white text-blue-600 hover:bg-gray-100 px-3 font-bold items-center"
                            >
                                My-Hotels
                            </Link>
                            <Link
                                to="/sign-out"
                                className="flex bg-white text-blue-600 hover:bg-gray-100 px-3 font-bold items-center"
                            >
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="flex bg-white text-blue-600 hover:bg-gray-100 px-3 font-bold items-center"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
