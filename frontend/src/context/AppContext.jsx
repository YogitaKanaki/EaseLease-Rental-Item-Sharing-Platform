import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { DummyProducts } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY; 
  const navigate = useNavigate();

  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  
  // Persist user to localStorage when updated
  const setUser = (userData) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { message: "Your item has been approved!", date: "Aug 18, 2025", type: "success" },
    { message: "New message from John.", date: "Aug 17, 2025", type: "info" },
    { message: "Reminder: Please return 'Mountain Tent' by Aug 20, 2025.", date: "Aug 19, 2025", type: "reminder" },
  ]);

  // Fetch All Products
  const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/product/all"); // GET all products
    const data = await res.json();
    setProducts(data); // store in state only
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    fetchProducts();
  }, []);

  const getTotalAmount = () => {
    // write this function for rent now
  };

  const value = {
    navigate,
    user,
    setUser,
    isAdmin,
    setIsAdmin,
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

export const useAppContext = () => useContext(AppContext);
