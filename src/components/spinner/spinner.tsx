import SpinnerImage from "@/assets/svg/spinner.svg";
import Image from "next/image";

export function Spinner() {
  return (
    <Image src={SpinnerImage} alt="loading-spinner" width={100} height={100} />
  );
}
