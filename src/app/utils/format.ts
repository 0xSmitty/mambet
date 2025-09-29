import { Address } from "viem";

export const formatAddress = (address: Address) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
}