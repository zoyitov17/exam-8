import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "flowbite-react";
import "./style.css";

function CryptoCarousel() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cryptocurrency data:", error);
      });
  }, []);

  const formatChangeColor = (percentage) => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-white";
  };

  return (
    <div
      className="w-full h-[400px]"
      style={{
        backgroundImage: `url('/header-img.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl h-full mx-auto my-0">
        <h1 className="text-[rgba(135,206,235,1)] text-6xl font-bold leading-[72px] tracking-[-0.5px] text-center pt-14">
          CRYPTOFOLIO WATCH LIST
        </h1>
        <p className="text-[rgba(169,169,169,1)] text-sm font-medium leading-[21.98px] text-center pt-3">
          Get all the Info regarding your favorite Crypto Currency
        </p>
        <Carousel
          className="mt-10 h-48"
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          {cryptoData.map((coin) => (
            <div
              key={coin.id}
              className="flex flex-col items-center justify-center rounded-lg p-4"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-20 h-20 mb-4"
              />
              <div className="flex items-center mb-2">
                <span className="text-white text-sm font-normal text-[rgba(255,255,255,1)] mr-2">
                  {coin.symbol.toUpperCase()}
                </span>
                <span
                  className={`text-sm font-medium ${formatChangeColor(
                    coin.price_change_percentage_24h
                  )}`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-white text-sm font-medium">
                {`${(coin.market_cap / 1e6).toLocaleString()}M`}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CryptoCarousel;
