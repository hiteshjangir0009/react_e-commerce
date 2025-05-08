import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { API_url, GetAPI, PostAPI } from '../Utils/API_config';
import Cookies from "js-cookie";
import loadRazorpay from '../Utils/loadRazorpay';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    // Example state to manage products in the cart
    const [cartItems, setCartItems] = useState([]);
    const [Payment_status, setPayment_status] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        state: "",
        city: "",
        pincode: "",
        address: ""
    });
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });



    useEffect(() => {
        cart_req();
    }, []);

    const cart_req = async () => {
        // TEST_KEY_ID =rzp_test_FwoIuE1CTsYWA8
        console.log(".env ==>>", import.meta.env.VITE_TEST_KEY_ID);

        try {
            const response = await GetAPI(API_url.Get_Cart_data);
            console.log("cart==>>", response);
            setCartItems(response.data);
        } catch (error) {
            console.log("checkout error ==>>", error);
        }
    };

    const DeleteAPI = async () => {
        try {
            const token = Cookies.get('Access_token');

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);


            const response = await fetch('https://api.khetconnect.xyz/api/v1/product/clear', {
                method: "DELETE",
                headers: myHeaders,
                redirect: "follow"
            });
            const result = await response.json();
            console.log('DeleteAPI result:', result);
            if (result.success) {
                // window.location.reload();
                navigate('/'); 

            }
            return result;
        } catch (error) {
            console.error('DeleteAPI Error:', error);
            throw error;
        }
    };


    const checkout_req = async (response) => {

        let pay_status = "Pending"



        const token = Cookies.get("Access_token");

        if (!shippingAddress.state || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.address) {
            alert("Please fill in all shipping address fields.");
            return;
        }

        console.log(cartItems.flat());
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "cart": cartItems,
            "totalAmount": calculateTotal(),
            "paymentStatus": "Completed",
            "shippingAddress": shippingAddress,
            "paymentId": response.razorpay_payment_id,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const res = await fetch("https://api.khetconnect.xyz/api/v1/checkout/checkout", requestOptions);
            const result = await res.json();
            console.log("result ==>>", result);

            if (result.success == true) {
                alert("your order is on the way")
                DeleteAPI()
            }
        } catch (error) {
            console.error(error);
        };

    };


    // razorpay payment
    const handleRazorpayPayment = async () => {
        // Validate customer info
        const { name, email, phone } = customerInfo;
        if (!name || !email || !phone) {
            alert("Please fill in your name, email, and phone number.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        const options = {
            key: import.meta.env.VITE_TEST_KEY_ID,
            amount: (calculateTotal()) * 100,
            currency: "INR",
            name: "Khet Connect",
            description: "Test Transaction",
            handler: function (response) {
                // alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                if (response.razorpay_payment_id) {
                    checkout_req(response);

                }
                console.log("response ==>>", response);
            },
            prefill: {
                name,
                email,
                contact: phone,
            },
            notes: {
                address: shippingAddress.address,
            },
            theme: {
                color: "#0f9d58",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };




    // Function to calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pt-30 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                {/* Cart Items */}
                <div className="mb-6 ">
                    <h3 className="text-xl font-semibold">Cart Items</h3>
                    <table className="min-w-full mt-4">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Product</th>
                                <th className="border-b px-4 py-2 text-left">Price</th>
                                <th className="border-b px-4 py-2 text-left">Quantity</th>
                                <th className="border-b px-4 py-2 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id}>
                                    <td className="border-b px-4 py-2">{item.product_name}</td>
                                    <td className="border-b px-4 py-2">₹{item.price}</td>
                                    <td className="border-b px-4 py-2">{item.quantity}</td>
                                    <td className="border-b px-4 py-2">₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Customer Information Form */}
                <div className='mb-6'>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your full name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className="block text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email address"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    />
                </div>
                <div className='mb-6'>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your phone number"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                </div>


                {/* Shipping Address */}
                {/* Shipping Address */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Shipping Address</h3>

                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your state"
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">City</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your city"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Pincode</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your pincode"
                                value={shippingAddress.pincode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Enter your full address"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            />
                        </div>
                    </div>
                </div>


                {/* Payment Information
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">Payment Information</h3>
                    <form className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Card Number</label>
                            <input type="text" className="w-full p-2 border rounded" placeholder="Enter your card number" />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium">CVV</label>
                                <input type="text" className="w-full p-2 border rounded" placeholder="CVV" />
                            </div>
                        </div>
                    </form>
                </div> */}

                {/* Order Summary */}
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Subtotal</span>
                        <span className="font-semibold">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Shipping</span>
                        <span className="font-semibold">₹50</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm">Total</span>
                        <span className="font-semibold">₹{calculateTotal() + 50} </span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => handleRazorpayPayment()}
                    className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Proceed to Payment
                </button>
            </div>
        </Layout>
    );
};

export default Checkout;
