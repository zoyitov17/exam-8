import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./style.css";
import { Button, Drawer } from "flowbite-react";
import { Link } from "react-router-dom";

const MarketTable = ({ currency }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCryptoData(currency);
  }, [currency]);

  const fetchCryptoData = (currency) => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      })
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const formatChangeColor = (percentage) => {
    if (percentage > 1) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-white";
  };

  const getCurrencySymbol = (currency) => {
    switch (currency.toUpperCase()) {
      case "USD":
        return "$";
      case "AED":
        return "د.إ";
      case "RUB":
        return "₽";
      default:
        return "$";
    }
  };

  const formatCurrency = (value) => {
    return `${getCurrencySymbol(currency)}${value.toLocaleString()}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cryptoData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-7xl mx-auto my-0 mt-4 pl-5 pr-5">
      <h2 className="text-white text-[34px] mb-7 font-normal leading-[42px] tracking-[0.25px] text-center">
        Cryptocurrency Prices by Market Cap
      </h2>
      <div className="overflow-x-auto bg-[rgba(66,66,66,1)] rounded-md w-full">
        <table className="w-full">
          <thead className="bg-[rgba(135,206,235,1)]">
            <tr className="rounded-md w-full h-14 ">
              <th className="p-4 w-[35%] border-b border-[rgba(81,81,81,1)] text-black text-base font-bold leading-6 text-left">
                Coin
              </th>
              <th className="p-4 w-1/5 border-b border-[rgba(81,81,81,1)] text-black text-base font-bold leading-6 text-right">
                Price
              </th>
              <th className="p-4 w-1/5 border-b border-[rgba(81,81,81,1)] text-black text-base font-bold leading-6 text-right">
                24h Change
              </th>
              <th className="p-4 w-1/5 border-b border-[rgba(81,81,81,1)] text-black text-base font-bold leading-6 text-right">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {currentItems.map((coin) => (
              <tr
                key={coin.id}
                className="border-b border-[rgba(81,81,81,1)] h-[93px] bg-[rgba(22,23,26,1)]"
              >
                <td className="flex items-center justify-start p-4 w-full">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-[50px] h-[50px] mr-4"
                  />
                  <div>
                    <div className="text-[22px] font-normal leading-[31.46px] text-left text-[rgba(255,255,255,1)]">
                      {coin.symbol.toUpperCase()}
                    </div>
                    <div className="text-sm font-normal leading-[20.02px] text-left text-[rgba(169,169,169,1)]">
                      {coin.name}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm font-normal leading-[20.02px] text-right text-[rgba(255,255,255,1)]">
                  {formatCurrency(coin.current_price)}
                </td>
                <td
                  className={`p-4 text-sm font-medium leading-[20.02px] text-right ${formatChangeColor(
                    coin.price_change_percentage_24h
                  )}`}
                >
                  <FaEye className="inline-block mr-2 w-[26px] h-6" />
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-4 text-sm font-normal leading-[20.02px] text-[rgba(255,255,255,1)] tracking-[0.15000000596046448px] text-right">
                  <Link to={`/currencydetail/${coin.id}`}>
                    {formatCurrency(coin.market_cap / 1e6)}M
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
