import { Routes, Route } from "react-router-dom";
import LoginForm from './components/authentication/LoginForm'
import RegisterForm from './components/authentication/RegisterForm'
import VerifyForm from './components/authentication/VerifyForm'
import './App.css'
import NotFound from "./components/authentication/NotFound";
import Dashboard from "./components/authentication/Dashboard";
import Product from "./components/authentication/Products";
import Settings from "./components/authentication/Settings";
import SingleProduct from "./components/products/detail";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register" element={<VerifyForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
