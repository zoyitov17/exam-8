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
      </Drawer.Items>
    </Drawer>
  );
};

export default DrawerSection;
