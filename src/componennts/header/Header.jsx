// import React from "react";

// function Header() {
//   return (
//     <div
//       className="w-full h-[400px]"
//       style={{
//         backgroundImage: `url('/header-img.jpg')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="max-w-7xl h-full mx-auto my-0">
//         <h1 className="text-[rgba(135,206,235,1)] text-6xl font-bold leading-[72px] tracking-[-0.5px] text-center pt-14">
//           CRYPTOFOLIO WATCH LIST
//         </h1>
//         <p className="text-[rgba(169,169,169,1)] text-sm font-medium leading-[21.98px] text-center pt-3">
//           Get all the Info regarding your favorite Crypto Currency
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Header;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CryptoCarousel() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Fetching cryptocurrency data
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cryptocurrency data:", error);
      });
  }, []);

  // Determine color based on price change percentage
  const formatChangeColor = (percentage) => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-white";
  };

  return (
    <div
      className="w-full h-[400px]"
      style={{
        backgroundImage: `url('/path-to-your-image.png')`, // Use the image file you've uploaded
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
        <div className="max-w-7xl mx-auto mt-5">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={2500}
            emulateTouch
            swipeable
            className="h-auto"
          >
            {cryptoData.map((crypto) => (
              <div
                key={crypto.id}
                className="flex items-center justify-center h-full p-4"
              >
                <div className="flex flex-col items-center justify-between h-full w-[120px] p-2 bg-opacity-90 bg-black rounded-lg shadow-lg">
                  <img
                    className="w-[50px] h-[50px] object-cover mb-2"
                    src={crypto.image}
                    alt={crypto.name}
                  />
                  <div className="flex flex-col items-center w-full">
                    <p className="text-base font-normal text-center text-white mb-1">
                      {crypto.symbol.toUpperCase()}
                    </p>
                    <p
                      className={`text-lg font-semibold ${formatChangeColor(
                        crypto.price_change_percentage_24h
                      )}`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                    <p className="text-lg font-semibold text-white">
                      ${crypto.current_price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default CryptoCarousel;


