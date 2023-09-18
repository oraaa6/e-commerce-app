import "@/styles/globals.scss";
import { Quicksand } from "next/font/google";
import styles from "./layout.module.scss";
import { BestPricesHeader } from "@/components/best-prices-header/best-prices-header";
import { NavBar } from "@/components/nav-bar/nav-bar";



const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
        <body className={quicksand.className}>
          <BestPricesHeader/>
          <NavBar />
          {children}
        </body>
    </html>
  );
}
