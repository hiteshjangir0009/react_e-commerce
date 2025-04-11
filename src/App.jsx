import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Products from "./Pages/Products"
import AuthPage from "./Pages/Auth/Login"
import ShoppingCart from "./Pages/Cart"
import Checkout from "./Pages/Checkout"
import Add_farmer from "./Pages/Add_farmer"
import ProductDetails from "./Pages/ProductDetails"
import Terms from "./Pages/Policies/terms"
import Privacy from "./Pages/Policies/privacy"
import Shiping_refund_cancel from "./Pages/Policies/cancel_refund_shiping"
import Faqs from "./Pages/Policies/Faqs"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:category' element={<Products />} />
          <Route path='/product' element={<Products />} />
          <Route path='/farmer' element={<Add_farmer />} />
          <Route path="/detail/:id" element={<ProductDetails />} />
          
          
          <Route path="/Faqs" element={<Faqs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shiping" element={<Shiping_refund_cancel />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
