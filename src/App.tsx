import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tests/:testId" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
