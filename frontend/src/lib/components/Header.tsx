import React, { useState } from "react";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-[#062a54] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/itu-logo-white.png" // Logonuzun yolu
            alt="Logo"
            className="h-15 w-24"
          />
          <h1 className="text-lg font-bold">Database Project</h1>
        </div>

        {/* Team Members Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Team Members
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2">
               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a
                  href="mailto:bicer22@itu.edu.tr?subject=Database%20Project&body=This%20is%20a%20message%20for%20Utku%20Biçer."
                  className="block"
                >
                  Utku Biçer
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a
                  href="mailto:gokturk20@itu.edu.tr?subject=Database%20Project&body=This%20is%20a%20message%20for%20Muhammed%20Arif%20Göktürk."
                  className="block"
                >
                  Muhammed Arif Göktürk
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a
                  href="mailto:senturker21@itu.edu.tr?subject=Database%20Project&body=This%20is%20a%20message%20for%20Ertuğrul%20Şentürk."
                  className="block"
                >
                  Ertuğrul Şentürk
                </a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a
                  href="mailto:simsekh22@itu.edu.tr?subject=Database%20Project&body=This%20is%20a%20message%20for%20Hüseyin%20Şimşek."
                  className="block"
                >
                  Hüseyin Şimşek
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
