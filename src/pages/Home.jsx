import React, { useState } from "react";
import Nav from "../componennts/nav/Nav";
import Header from "../componennts/header/Header";
import MarketTable from "../componennts/markettable/MarketTable";


function Home() {
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="w-full mx-auto my-0">
      <Nav onCurrencyChange={handleCurrencyChange} />
      <Header />
      <MarketTable currency={currency} />
    </div>
  );
}

export default Home;
