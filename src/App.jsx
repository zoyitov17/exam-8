import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyDetail from "./pages/CurrencyDetail";
import "flowbite/dist/flowbite.css";

function App() {
  return (
    <Router>
      <div className="w-full h-auto mx-auto my-0 box-border bg-[rgba(20,22,26,1)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currencydetail/:coinId" element={<CurrencyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
