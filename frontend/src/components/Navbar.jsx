import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Bell } from "lucide-react"; // Import Bell icon

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        setSearchQuery,
        searchQuery,
    } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>

                {user && (
                    <>
                        <NavLink to='/listings'>
                        Available to Rent</NavLink>
                    </>
                )}

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        alt="search"
                        type="text"
                        placeholder="Search products"
                    />
                    <img src={assets.search_icon} alt="search" className="w-4 h-4" />
                </div>

                {/* Add Item Icon */}
                <div onClick={() => navigate("/addItem")} className="cursor-pointer">
    <img src={assets.addItem} alt="add-item" className="w-6 opacity-80" />
</div>


                {/* 🔔 Bell Icon */}
                <div onClick={() => navigate("/notifications")} className="relative cursor-pointer">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 text-[10px] font-medium text-white bg-red-500 w-[16px] h-[16px] flex items-center justify-center rounded-full">
                        4
                    </span>
                </div>

                {/* Login/Profile */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group flex items-center gap-2">
                        <span className="font-medium text-sm hidden md:block">
                            {user?.name || "User"}
                        </span>
                        <img src={assets.profile} className="w-10 rounded-full cursor-pointer" alt="profile" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li onClick={() => navigate("/update")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Update</li>
                            <li onClick={() => navigate("/rentals")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Borrowings</li>
                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-6 sm:hidden">
                <div onClick={() => navigate("/addItem")} className="relative cursor-pointer">
                    <img src={assets.addItem} alt="add-item" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                </div>
                <button onClick={() => setOpen(!open)} aria-label="Menu">
                    <svg width="21" height="15" alt='menu' viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="1.5" rx=".75" fill="#426287" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {open && (
  <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-4 px-6 text-base md:hidden z-50">
    <NavLink to='/' onClick={() => setOpen(false)} className="hover:text-primary">Home</NavLink>
    <NavLink to='/products' onClick={() => setOpen(false)} className="hover:text-primary">All Products</NavLink>
    {user && (
      <NavLink to='/listings' onClick={() => setOpen(false)} className="hover:text-primary">Available to Rent</NavLink>
    )}

    {!user ? (
      <button
        onClick={() => {
          setOpen(false);
          setShowUserLogin(true);
        }}
        className="w-full cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
      >
        Login
      </button>
    ) : (
      <button
        onClick={logout}
        className="w-full cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
      >
        Logout
      </button>
    )}
  </div>
)}
        </nav>
    );
};

export default Navbar;
