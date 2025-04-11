import React from 'react';
import Layout from '../../Layout/Layout';

const Faqs = () => {
    const faqs = [
        {
            question: "What is Khet Connect?",
            answer:
                "Khet Connect is an online platform where you can buy fresh grains, fruits, and vegetables directly from trusted sources.",
        },
        {
            question: "Where do you deliver?",
            answer:
                "We currently deliver in selected cities across India. During checkout, you can check delivery availability using your PIN code.",
        },
        {
            question: "How long does delivery take?",
            answer:
                "We usually deliver within 1-3 business days depending on your location and product availability.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) in selected areas.",
        },
        {
            question: "Can I cancel or return an order?",
            answer:
                "Yes. You can cancel before dispatch or request a return if the item is damaged or not as described. Please refer to our Cancellation & Refund Policy.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach us at help@khetconnect.in or call our helpline available on the Contact Us page.",
        },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 px-4 py-30 md:px-16">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-green-700 mb-8">Frequently Asked Questions (FAQs)</h1>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
                                <p className="text-gray-700 mt-2">{faq.answer}</p>
                                <hr className="my-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Faqs;
