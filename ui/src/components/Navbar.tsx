import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 flex items-center justify-between font-mono ">
      <div className="text-lg">A quien botamos alv</div>
      <ul className="flex items-center">
        <li className="px-3 cursor-pointer hover:mb-2 hover:border-b-stone-700 mb-2 border-stone-400">
          Contribuir
        </li>
        <li className="px-3 cursor-pointer hover:mb-2 hover:border-b-stone-700 mb-2 border-stone-400">
          a
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
