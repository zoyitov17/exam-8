import React from "react";

function Nav({ onCurrencyChange }) {
  return (
    <div className="max-w-7xl h-16 mx-auto flex items-center px-5">
      <div className="w-full h-full flex items-center justify-between">
        <div className="w-4/5 flex items-center">
          <p className="text-[rgba(135,206,235,1)] text-xl font-bold leading-8">
            CRYPTOFOLIO
          </p>
        </div>
        <div className="w-1/5 flex items-center justify-end space-x-4">
          <div className="w-20 flex items-center">
            <select
              className="border-none outline-none text-base font-normal leading-[19px] text-left text-white bg-[#14161A]"
              name="money-unit"
              id="money-unit"
              onChange={onCurrencyChange}
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
  );
}

export default Nav;


