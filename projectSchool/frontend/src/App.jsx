import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Signin } from "./pages/Signin";

import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { AllQuiz } from "./pages/AllQuiz";
import { SendMoney } from "./pages/SendMoney";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Signin" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AllQuiz" element={<AllQuiz />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
