import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CurrencyDetail = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("7d"); 
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCoinData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
      setError("Data could not be fetched. Please try again later.");
      setCoinData(null);
    }
  };

  const fetchChartData = async (range) => {
    try {
      setIsLoading(true);
      let days;
      switch (range) {
        case "24h":
          days = 1;
          break;
        case "30d":
          days = 30;
          break;
        case "3m":
          days = 90;
          break;
        case "1y":
          days = 365;
          break;
        default:
          days = 7;
      }
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${days}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChartData(data.prices);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setError("Chart data could not be fetched. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [coinId]);

  useEffect(() => {
    fetchChartData(timeRange);
  }, [timeRange, coinId]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[rgba(20,22,26,1)] text-white flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!coinData || isLoading || !chartData) {
    return (
      <div className="min-h-screen bg-[rgba(20,22,26,1)] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const chartLabels = chartData.map((item) => {
    const date = new Date(item[0]);
    return timeRange === "24h"
      ? `${date.getHours()}:${date.getMinutes()}`
      : date.toLocaleDateString();
  });
  const chartPrices = chartData.map((item) => item[1]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `Price (INR)`,
        data: chartPrices,
        fill: true,
        backgroundColor: "rgba(56, 189, 248, 0.2)",
        borderColor: "#38BDF8",
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "white",
          callback: function (value) {
            return value.toFixed(2);  
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };


  return (
    <div>
      <div className="w-full h-20 flex items-center px-5 bg-[rgba(20,22,26,1)] shadow-lg">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-[rgba(135,206,235,1)] text-2xl font-bold leading-8"
            >
              CRYPTOFOLIO
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <select
                className="border-none outline-none text-base font-normal leading-[19px] text-left text-white bg-[#14161A]"
                name="money-unit"
                id="money-unit"
              >
                <option value="USD">USD</option>
                <option value="AED">AED</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
            <button className="rounded bg-[rgba(135,206,235,1)] w-32 h-10 flex items-center justify-center">
              WATCH LIST
            </button>
          </div>
        </div>
      </div>

      <div className="h-[88vh] bg-[rgba(20,22,26,1)] text-white flex items-start justify-center py-5 ">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row px-5">
          <div className="w-full mr-7 border-r-2 border-r-[rgba(128,128,128,1)] border-solid lg:w-[35%] lg:pr-10 mb-10 lg:mb-0">
            <div className="flex flex-col items-center lg:items-start">
              {coinData.image?.large ? (
                <img
                  src={coinData.image.large}
                  alt={`${coinData.name} Logo`}
                  className="w-32 h-32 mb-5 mx-auto my-0"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-600 mb-5"></div>
              )}
              <h1 className="text-3xl mx-auto my-0 font-bold mb-3">
                {coinData.name}
              </h1>
              <p className="text-base font-normal leading-7  mb-5">
                {coinData.description?.en
                  ? coinData.description.en.split(". ")[0] + "."
                  : "No description available."}
              </p>
              <div className="w-full flex flex-col space-y-2">
                <div className="flex gap-3">
                  <span className="font-semibold text-[rgba(255,255,255,1)] text-base">
                    Rank:
                  </span>
                  <span className="text-[rgba(255,255,255,1)] font-light">
                    {coinData.market_cap_rank || "N/A"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-[rgba(255,255,255,1)] text-base">
                    Current Price:
                  </span>
                  <span className="text-[rgba(255,255,255,1)] font-light">
                    ₹{" "}
                    {coinData.market_data?.current_price?.inr?.toLocaleString() ||
                      "N/A"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-[rgba(255,255,255,1)] text-base">
                    Market Cap:
                  </span>
                  <span className="text-[rgba(255,255,255,1)] font-light">
                    ₹{" "}
                    {coinData.market_data?.market_cap?.inr
                      ?.toLocaleString()
                      .slice(0, -6)}
                    M
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[65%]">
            <div className="flex flex-col items-center">
              <Line data={data} options={options} className="w-full" />
              <div className="flex justify-around w-full mt-5">
                {["24h", "30d", "3m", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => handleTimeRangeChange(range)}
                    className={`${
                      timeRange === range
                        ? "bg-[rgba(135,206,235,1)] text-black"
                        : "bg-[rgba(128,128,128,1)] text-white"
                    } px-4 py-2 rounded font-medium`}
                  >
                    {range === "24h"
                      ? "24 Hours"
                      : range === "30d"
                      ? "30 Days"
                      : range === "3m"
                      ? "3 Months"
                      : "1 Year"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetail;
