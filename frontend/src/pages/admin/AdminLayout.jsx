import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AdminLayout = () => {

    const {setIsAdmin}=useAppContext();


    const sidebarLinks = [
        { name: "Dashboard", path: "/admin", icon: assets.add_address_image },
        {name:"User Mangement",path:"/admin/user-management",icon:assets.banner1},
        {name:"Item Mangement",path:"/admin/item-management",icon:assets.banner1},
        {name:"Rentals Mangement",path:"/admin/rentals-management",icon:assets.banner1},
        {name:"Disputes and Reports",path:"/admin/reports",icon:assets.banner1},
    ];

    const logout=async()=>{
        setIsAdmin(true);
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 
            py-3 bg-white">
                <Link to='/'>
                    <img src={assets.logo2} className="cursor-pointer h-10 w-auto md:w-38"  alt="logo" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} 
                    className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/admin"}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white"
                            }`
                        }
                    >
                        <img src={item.icon} className="w-7 h-7" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            
          <Outlet />
        

        </div>
            
        </>
    );
};

export default AdminLayout;