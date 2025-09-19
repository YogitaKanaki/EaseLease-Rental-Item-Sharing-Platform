import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { DummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY; 
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery,setSearchQuery]=useState([]);

    // Mock notifications
  const [notifications, setNotifications] = useState([
  {
    message: "Your item has been approved!",
    date: "Aug 18, 2025",
    type: "success",
  },
  {
    message: "New message from John.",
    date: "Aug 17, 2025",
    type: "info",
  },
  {
    message: "Reminder: Please return 'Mountain Tent' by Aug 20, 2025.",
    date: "Aug 19, 2025",
    type: "reminder",
  },
]);

    


    // Fetch All Products
    const fetchProducts = async () => {
        setProducts(DummyProducts);
    };

    

    

    useEffect(() => {
        fetchProducts();
    }, []);

    //GetTotalAmount
    const getTotalAmount=()=>{
        //I have write this function for rent now
    }

    const value = {
        navigate,
        user,
        isAdmin,
        setIsAdmin,
        setUser,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        currency,
        searchQuery,
        setSearchQuery,
        getTotalAmount,
        notifications,
        setNotifications,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
