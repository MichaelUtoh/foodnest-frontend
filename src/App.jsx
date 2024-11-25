import { Routes, Route } from "react-router-dom";
import LoginForm from './components/authentication/LoginForm'
import RegisterForm from './components/authentication/RegisterForm'
import VerifyForm from './components/authentication/VerifyForm'
import './App.css'
import NotFound from "./components/authentication/NotFound";
import Dashboard from "./components/authentication/Dashboard";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register" element={<VerifyForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
