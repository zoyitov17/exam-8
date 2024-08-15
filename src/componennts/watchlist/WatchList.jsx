import React, { useContext } from "react";
import { Drawer } from "flowbite-react";
import { CountriesContext } from "../../context/CountriesContext";

const DrawerSelected = () => {
  const { isOpen, handleClose, selectedCountries } =
    useContext(CountriesContext);
  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          {selectedCountries.map((s) => (
            <div className="flex justify-between  ">
              <span>{s.flag}</span>
              <p className="text-black font-bold">{s.name.common}</p>
            </div>
          ))}
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default DrawerSelected;
