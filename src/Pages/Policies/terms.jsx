import React from 'react'
import Layout from '../../Layout/Layout'

const Terms = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-30 md:px-16">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Terms and Conditions
          </h1>

          <p className="text-gray-700 mb-4">
            Welcome to <strong>Khet Connect</strong>! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. General</h2>
          <p className="text-gray-700 mb-4">
            Khet Connect is an online platform that provides delivery of grains, fruits, and vegetables. These terms apply to all users of the website and our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Product Accuracy</h2>
          <p className="text-gray-700 mb-4">
            We strive to provide accurate information for all products. However, slight variations in appearance or weight may occur due to natural conditions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Pricing & Payment</h2>
          <p className="text-gray-700 mb-4">
            All prices are in INR and subject to change without prior notice. We accept online payments through secure third-party gateways. Orders are confirmed upon successful payment.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Account Responsibility</h2>
          <p className="text-gray-700 mb-4">
            Users are responsible for maintaining the confidentiality of their account information and password. Khet Connect is not liable for any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. Modification of Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to change these terms at any time. Updates will be posted on this page. Continued use of the website constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about these terms, please contact us at: <br />
            <a href="mailto:help@khetconnect.in" className="text-blue-600 underline">
            khetconnect@gmail.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Terms;
