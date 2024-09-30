import { CustomButton } from "../Custom/CustomButton"
import Image from "next/image";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <div
      className={`fixed w-full h-full overflow-hidden bg-[#1a1a1a] left-0 z-20 transition-all duration-300 ease-in-out ${
        isOpen ? "top-0" : "-top-full"
      }`}
    >
      <div className="flex flex-col h-full p-5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-xl font-bold">Menu</h2>
          <button className="p-2" onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-64 mb-8">
            <CustomButton />
          </div>
          
          <div className="flex gap-4 mt-auto">
            <a href="https://twitter.com/HumpingUnic0rns" className="p-2 bg-[#EAEAEC] rounded-full">
              <Image src='/twitter_logo.png' alt="Twitter" width={25} height={25} />
            </a>
            <a href="https://discord.gg/eKPsXYsDnE" className="p-2 bg-[#EAEAEC] rounded-full">
              <Image src='/discord_logo.webp' alt="Discord" width={25} height={25} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;