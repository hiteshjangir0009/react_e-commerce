import React from "react";
import loadRazorpay from "../Utils/loadRazorpay";

const RazorpayButton = () => {
  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: import.meta.env.TEST_KEY_ID,
      amount: 100*100, // amount in paise = ₹100
      currency: "INR",
      name: "Khet Connect",
      description: "Test Transaction",
      image: "https://img.freepik.com/free-vector/natural-landscape-background-theme_23-2148650336.jpg?t=st=1744376028~exp=1744379628~hmac=cfd3522f2b85d7ba1e1da696f24a8e3ccbb0a83dc43dfd0141eadd623edf146c&w=2000", // optional
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Hitesh Jangir",
        email: "khetconnect@gmail.com",
        contact: "7665890598",
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#0f9d58",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Pay ₹100
    </button>
  );
};

export default RazorpayButton;
