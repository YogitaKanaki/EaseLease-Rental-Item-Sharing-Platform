import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { DummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY; // fixed: should be import.meta.env
    const navigate = useNavigate();

    const [user, setUser] = useState(true);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery,setSearchQuery]=useState([]);
    


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
        setUser,
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        currency,
        searchQuery,
        setSearchQuery,
        getTotalAmount
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
