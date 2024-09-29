import { CustomButton } from "../Custom/CustomButton"
import Image from "next/image";
import React from "react";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className="w-full h-13 sticky top-0 mb-4 bg-[#1a1a1a] z-10">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-10">
            <div className="flex gap-4 bg-[#EAEAEC] rounded-full p-2" style={{ boxShadow: "0 0.1rem 0 0 rgba(255, 255, 255, 0.1)" }}>
              <a href="https://twitter.com/HumpingUnic0rns">
                <Image src='/twitter_logo.png' alt="twitter_logo"
                  width={25}
                  height={25}
                  style={{ borderRadius: 999 }} className=""
                />
              </a>
              <a href="https://discord.gg/eKPsXYsDnE">
                <Image src='/discord_logo.webp' alt="discord_logo"
                  width={25}
                  height={25}
                  style={{ borderRadius: 999 }} className=""
                />
              </a>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
          <div className="justify-center items-center m-2 w-3/4 hidden md:flex">

            <div className="ml-auto">
              {CustomButton()}
            </div>
          </div>
        </div>
      </div>
      <hr className='w-full bg-white mb-4 xl:mb-8'></hr>
    </div>
  );
};

export default Navbar;