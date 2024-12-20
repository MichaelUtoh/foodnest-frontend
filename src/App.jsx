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
import Inventory from "./components/authentication/Inventory";
import ForgotPassword from "./components/authentication/ForgotPassword";

function App() {

  return (
    <>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/verify" element={<VerifyForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
