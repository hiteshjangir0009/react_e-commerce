import React from 'react'
import Layout from '../../Layout/Layout'

const Shiping_refund_cancel = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 px-4 py-30 md:px-16">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-10">
        {/* Privacy Policy */}
        <section>
          <h1 className="text-3xl font-bold text-green-700 mb-4">Privacy Policy</h1>
          <p className="text-gray-700 mb-2">
            At <strong>Khet Connect</strong>, we respect your privacy and are committed to protecting your personal data.
          </p>
          <p className="text-gray-700 mb-2">
            We collect customer information to fulfill orders and improve your shopping experience. This may include name, contact number, address, and payment details. Your data is never sold or misused.
          </p>
          <p className="text-gray-700 mb-2">
            All transactions are secured using third-party payment gateways. We do not store your card or banking information on our servers.
          </p>
          <p className="text-gray-700">
            For any privacy-related concerns, please contact us at:
            <a href="mailto:help@khetconnect.in" className="text-blue-600 underline ml-1">khetconnect@gmail.com</a>
          </p>
        </section>

        {/* Cancellation and Refund Policy */}
        <section>
          <h1 className="text-3xl font-bold text-green-700 mb-4">Cancellation and Refund Policy</h1>
          <p className="text-gray-700 mb-2">
            Orders once placed can only be cancelled within 1 hour of placing the order. After dispatch, cancellations will not be entertained.
          </p>
          <p className="text-gray-700 mb-2">
            If you receive a damaged or incorrect item, please raise a complaint within 24 hours of delivery. We will verify and issue a full or partial refund based on the situation.
          </p>
          <p className="text-gray-700">
            Refunds are processed within 5-7 business days via the original payment method.
          </p>
        </section>

        {/* Shipping Policy */}
        <section>
          <h1 className="text-3xl font-bold text-green-700 mb-4">Shipping Policy</h1>
          <p className="text-gray-700 mb-2">
            We deliver fresh grains, fruits, and vegetables directly to your doorstep. Delivery times may vary depending on your location, but typically orders are processed within 24 hours.
          </p>
          <p className="text-gray-700 mb-2">
            Currently, we offer delivery in selected pin codes. You will be notified at checkout if your area is serviceable.
          </p>
          <p className="text-gray-700">
            Shipping is either free or calculated based on distance. You’ll see the applicable charge before confirming the order.
          </p>
        </section>
      </div>
    </div>
    </Layout>
  )
}

export default Shiping_refund_cancel
