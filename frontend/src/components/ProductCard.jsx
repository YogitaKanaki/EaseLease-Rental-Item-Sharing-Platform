import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
    const { navigate,currency } = useAppContext();

    const goToDetails = () => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
    };

    return product && (
        <div
            onClick={goToDetails}
            className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full cursor-pointer"
        >
            {/* Image */}
            <div className="group flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition-transform duration-300 max-w-26 md:max-w-36"
                    src={product.image[0]}
                    alt={product.name}
                />
            </div>

            {/* Details */}
            <div className="text-gray-500/60 text-sm mt-2">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

                {/* Rating */}
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img
                            key={i}
                            className="md:w-3.5 w-3"
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt="star_icon"
                        />
                    ))}
                    <p>(4)</p>
                </div>

                {/* Price and Rent Now */}
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.pricePerDay}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            {currency}{product.deposit}
                        </span>
                    </p>

                    <button
                        className="py-2 px-3 bg-primary text-white  cursor-pointer rounded hover:bg-primary-dull transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToDetails();
                        }}
                    >
                        Rent Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
