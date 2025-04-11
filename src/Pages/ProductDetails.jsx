import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { API_url, GetAPI, PostAPI } from "../Utils/API_config";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [hover, setHover] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [comment, setComment] = useState(""); // New comment state

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await GetAPI(API_url.Get_Data);
            if (res.statusCode === 200 && res.data) {
                const prod = res.data.find((item) => item._id === id);
                if (prod) {
                    setProduct(prod);
                    calcAverage(prod.ratings || []);

                    // 👇 FIX: set user rating if already exists
                    const userId = "123"; // <-- Replace with real logged-in user ID
                    const existing = prod.ratings?.find((r) => r.user === userId);
                    if (existing) setUserRating(existing.rating);
                }
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };





    const calcAverage = (ratings) => {
        if (!ratings || ratings.length === 0) return setAvgRating(0);
        const total = ratings.reduce((sum, r) => sum + r.rating, 0);
        setAvgRating((total / ratings.length).toFixed(1));
    };

    const handleRating = async (value) => {

        const formdata = new FormData();
        formdata.append("productId", id);
        formdata.append("rating", userRating);
        formdata.append("comment", comment);

        const res = await PostAPI(API_url.Product_rating, formdata);
        console.log(res);

        if (res.statusCode === 200) {
            setUserRating(value);
            fetchProduct();
        }
    };

    if (!product) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <img
                src={product?.product_img}
                alt={product?.product_name}
                className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{product.product_name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold mt-2 text-green-600">₹{product.price}</p>

            {/* Average Rating */}
            <div className="mt-4">
                <span className="text-yellow-500 text-xl font-medium">
                    {avgRating} ⭐ ({product.ratings?.length || 0} reviews)
                </span>
            </div>

            {/* Rating Stars */}

            <div className="mt-4">
                {/* Rating Stars */}
                <div className="flex gap-2 mb-2">
                    {[...Array(5)].map((_, index) => {
                        const value = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    className="hidden"
                                // ❌ Remove this to avoid premature submission
                                // onClick={() => handleRating(value)}
                                />
                                <FaStar
                                    size={30}
                                    className={`cursor-pointer ${value <= (hover || userRating || 0)
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                        }`}
                                    onMouseEnter={() => setHover(value)}
                                    onMouseLeave={() => setHover(null)}
                                    onClick={() => setUserRating(value)} // ✅ Only set the rating
                                />
                            </label>
                        );
                    })}
                </div>

                <textarea
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded p-2 mb-2"
                />

                <button
                    onClick={() => handleRating(userRating)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                >
                    Submit Rating
                </button>


                {/* ⭐ All Ratings and Comments */}
                {product.ratings && product.ratings.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2 text-lg">What others say:</h3>
                        <div className="space-y-2">
                            {product.ratings.map((r, i) => (
                                <div key={`${r.user}-${r.rating}-${r.comment}`} className="bg-gray-100 rounded p-3">
                                    <p className="font-medium text-yellow-600">Rating: {r.rating} ⭐</p>
                                    <p className="text-gray-800 italic">"{r.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProductDetails;
