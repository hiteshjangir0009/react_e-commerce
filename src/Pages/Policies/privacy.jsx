import React from 'react'
import Layout from '../../Layout/Layout'

const Privacy = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 px-4 py-30 md:px-16">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          At <strong>Khet Connect</strong>, we are committed to safeguarding your privacy. This policy outlines how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Your name, contact number, and delivery address</li>
          <li>Payment information via secure gateways (we do not store card details)</li>
          <li>Browsing behavior and preferences on our platform</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">2. How We Use Your Data</h2>
        <p className="text-gray-700 mb-4">
          We use your data to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Process and deliver your orders efficiently</li>
          <li>Send order updates and promotional offers</li>
          <li>Improve our services based on your feedback and usage</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Data Protection</h2>
        <p className="text-gray-700 mb-4">
          We use industry-standard encryption and secure payment gateways to protect your data. We never sell, trade, or rent your personal information to third parties.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          We may use third-party services for analytics, payment processing, and delivery. These parties are obligated to keep your data confidential.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about your privacy, feel free to contact us at:
          <br />
          <a href="mailto:help@khetconnect.in" className="text-blue-600 underline">khetconnect@gmail.com</a>
        </p>
      </div>
    </div>
    </Layout>
  )
}

export default Privacy
