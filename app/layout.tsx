"use client";

import "../styles/globals.scss";
import { Quicksand } from "next/font/google";
import styles from "./layout.module.scss";
import { NavBar } from "@/components/nav-bar/nav-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={quicksand.className}>
          <NavBar />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
