import { AvatarComponent } from "@rainbow-me/rainbowkit";
import Image from "next/image";

 export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    return (
      <Image
        src={'/humping_images/avatar.webp'}
        alt="Avatar"
        width={50}
        height={50}
        style={{ borderRadius: 999 }}
      />
    ) 
  };