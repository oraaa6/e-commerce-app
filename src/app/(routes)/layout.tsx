import "@/styles/globals.scss";
import { Quicksand } from "next/font/google";
import styles from "./layout.module.scss";
import { BestPricesHeader } from "@/components/best-prices-header/best-prices-header";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { AuthProvider } from "@/context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";

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
        <Provider store={store}>
          <AuthProvider>
            <ToastContainer
              className={styles.toast}
              autoClose={2000}
              hideProgressBar={true}
            />
            <BestPricesHeader />
            <NavBar />
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
