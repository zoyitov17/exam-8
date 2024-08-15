import React from "react";
import { Drawer } from "flowbite-react";

const DrawerSection = ({ handleClose, isOpen }) => {
  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      className="w-3/12 min-h-screen bg-[rgba(81,81,81,1)]"
    >
      <Drawer.Items>
        <h2 className="text-3xl font-medium leading-[24.5px] text-center mb-5 text-[rgba(255,255,255,1)]">
          WATCHLIST
        </h2>
        <div className="flex gap-4 mb-3">
          <div className="w-[50%] h-56 bg-[rgba(20,22,26,1)] rounded-3xl ">
            <img
              className="w-11/12 h-2/5 border rounded-[50%] mx-auto my-0 mt-4"
              src=""
              alt=""
            />
            <p className="text-xl font-normal leading-[20.02px] text-center mt-8 text-[rgba(255,255,255,1)]">
              ₹ 3,045,665.00
            </p>
            <button className="w-4/5 h-8 bg-[rgba(255,0,0,1)] text-xl font-normal leading-[20.02px] mt-4 ml-[13px] text-[rgba(255,255,255,1)]">
              Remove
            </button>
          </div>
          <div className="w-[50%] h-56 bg-[rgba(20,22,26,1)] rounded-3xl ">
            <img
              className="w-11/12 h-2/5 border rounded-[50%] mx-auto my-0 mt-4"
              src=""
              alt=""
            />
            <p className="text-xl font-normal leading-[20.02px] text-center mt-8 text-[rgba(255,255,255,1)]">
              ₹ 3,045,665.00
            </p>
            <button className="w-4/5 h-8 bg-[rgba(255,0,0,1)] text-xl font-normal leading-[20.02px] mt-4 ml-[13px] text-[rgba(255,255,255,1)]">
              Remove
            </button>
          </div>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default DrawerSection;
