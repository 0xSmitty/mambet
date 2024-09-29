import Image from "next/image";
import { CustomButton } from "../Custom/CustomButton"

const Sidebar = ({
        isOpen,
        toggle,
    }: {
        isOpen: boolean;
        toggle: () => void;
    }): JSX.Element => {
  return (
    <>
      <div
        className="fixed w-full h-full overflow-hidden bg-[#808080] grid md:pt-[60px] left-0 z-10"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`
        }}
      >
         <div style={{
                zIndex: -1,
                position: "fixed",
                width: "100vw",
                height: "100vh"
            }}>
            </div>
        
        <button className="absolute right-0 p-5" onClick={toggle}>
        {/* Close icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"> 
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button>

        <div className="flex justify-center w-full">
            <div className="ml-auto flex justify-center">
                {CustomButton()}
            </div>
		</div>
      </div>
    </>
  );
};

export default Sidebar;