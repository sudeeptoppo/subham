import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Signin } from "./pages/Signin";

import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Signin" />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
