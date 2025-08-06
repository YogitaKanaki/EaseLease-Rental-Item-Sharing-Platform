import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const RentNow = () => {
  const [showAddress, setShowAddress] = useState(false);
  const { state } = useLocation();
  const { products, currency,navigate } = useAppContext();
  const [addresses,setAdresses]=useState(dummyAddress)
  const [selectedAddresses,setSelectedAddresses]=useState(dummyAddress[0])
  const [paymentOption,setPaymentOption]=useState("Online Payment")

  // Extract data passed from ProductDetails page
  const { productId, startDate, endDate } = state || {};

  const product = products.find((p) => p._id === productId);
  const placeOrder=async()=>{
     //backend part
  }

  if (!product) {
    return <div className="p-10 text-center text-lg">Product not found</div>;
  }

  // Calculate number of rental days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(end - start, 0);
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const rentalPrice = product.pricePerDay * rentalDays;
  const deposit = product.deposit;
  const total = rentalPrice + deposit;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto gap-10">
      {/* LEFT SIDE - Product Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-medium uppercase">Rent Details</h1>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>

        <div className="border border-gray-200 mt-4 rounded-xl p-10 flex flex-col md:flex-row gap-6 shadow-sm bg-white">
          <div className="w-56 h-56 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image[0]}
              alt={product.name}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">
              Price/Day: <span className="font-medium">{currency}{product.pricePerDay}</span>
            </p>
            <p className="text-gray-600">
              Deposit: <span className="font-medium">{currency}{product.deposit}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Selected Dates:{" "}
              <span className="text-primary">
                {startDate} to {endDate}
              </span>
            </p>
            <p className="text-gray-900">
              Total Rental Days: <strong>{rentalDays}</strong>
            </p>
          </div>
        </div>
        <button onClick={()=>{navigate("/products")}} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
            <img className="group-hover:-translate-x-1 transition" alt="arrow" src={assets.arrow_right_icon_colored}/>
            Back to Products
        </button>
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="max-w-[380px] w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <hr className="border-gray-200 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-3">
            <p className="text-gray-500">{selectedAddresses ? `${selectedAddresses.street}
            ,${selectedAddresses.city}`:"No address found"}</p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-200 rounded shadow text-sm w-full">
                {addresses.map((address,index)=>(<p
                  onClick={() => {setSelectedAddresses(address);
                     setShowAddress(false)}}
                  className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer">
                  {address.street},{address.city},{address.zipcode},{address.state},{address.country}
                </p>
            )) }
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary-dull"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select onChange={e=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded">
            <option value="COD">Credit Card</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-200" />

        <div className="text-gray-600 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Rental Price ({rentalDays} days)</span>
            <span className="font-medium">
              {currency}{rentalPrice}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Deposit</span>
            <span className="font-medium">
              {currency}{deposit}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-primary font-medium">Free</span>
          </p>
          <p className="flex justify-between text-lg font-semibold mt-4">
            <span>Total Amount:</span>
            <span>{currency}{total}</span>
          </p>
        </div>

        <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium rounded-lg hover:bg-primary-dull transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default RentNow;
