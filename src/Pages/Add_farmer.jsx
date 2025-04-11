import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Layout from '../Layout/Layout'
import { API_url, PostAPI } from '../Utils/API_config'

const Add_farmer = () => {
  const initialValues = {
    name: '',
    phone: '',
    address: '',
    landSize: '',
    crops: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required / नाम आवश्यक है'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone must be 10 digits / फ़ोन नंबर 10 अंकों का होना चाहिए')
      .required('Phone is required / फ़ोन नंबर आवश्यक है'),
    address: Yup.string().required('Address is required / पता आवश्यक है'),
    landSize: Yup.number()
      .typeError('Must be a number / यह एक संख्या होनी चाहिए')
      .positive('Must be positive / यह एक सकारात्मक संख्या होनी चाहिए')
      .required('Land size is required / भूमि का आकार आवश्यक है'),
    crops: Yup.string().required('Please specify what you grow / कृपया बताएं कि आप क्या उगाते हैं'),
  })

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const formdata = new FormData()
    formdata.append('name', values.name)
    formdata.append('phone', values.phone)
    formdata.append('address', values.address)
    formdata.append('landSize', values.landSize)
    formdata.append('crops', values.crops)

    try {
      const response = await PostAPI(`${API_url.Add_farmer}`, formdata) // Adjust URL if not Register
      console.log(response)
      alert('Farmer added successfully!')
      resetForm()
      // Optionally call getFarmers()
    } catch (error) {
      console.error(error)
      alert('Error adding farmer')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md pt-30">
        <h2 className="text-2xl font-bold mb-6 text-center">Join Khet Connect / खेत कनेक्ट से जुड़ें</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-5">
            <FormField label="Name / नाम" name="name" type="text" />
            <FormField label="Phone / फ़ोन नंबर" name="phone" type="text" />
            <FormField label="Address / पता" name="address" type="textarea" />
            <FormField label="Land Size (acres) / भूमि का आकार (एकड़ में)" name="landSize" type="text" />
            <FormField label="What You Grow / आप क्या उगाते हैं" name="crops" type="text" placeholder="e.g. Wheat / गेंहू, Rice / चावल" />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Join Now / अभी जुड़ें
            </button>
          </Form>
        </Formik>
      </div>
    </Layout>
  )
}

// Reusable form field component
const FormField = ({ label, name, type, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <Field
      as={type === 'textarea' ? 'textarea' : 'input'}
      name={name}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
)

export default Add_farmer
