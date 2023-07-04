"use client";

import styles from "./nav-bar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/svg/logo.svg";
import Hambrger from "../../assets/png/hamburger.png";
import CloseIcon from "../../assets/png/cross-button.png";
import Bag from "../../assets/svg/bag.svg";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.contentContainer}>
        <Link href="/" className={styles.foxLink}>
          <Image
            className={styles.fox}
            src={Logo}
            alt="Fox shop logo"
            width={130}
          />
        </Link>
        <div className={styles.searchInput}>
          <input type="text" />
        </div>
        <div className={`${styles.linksContainer} ${openMenu ? "open" : ""}`}>
          <ul className={styles.links}>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li className={styles.cartLink}>
              <Link href="/cart">
                <div className={styles.amountCart}>5</div>
                <Image
                  className={styles.bag}
                  src={Bag}
                  alt="Your shopping bag"
                  width={35}
                  height={30}
                />
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setOpenMenu((prevState) => !prevState)}
          className={styles.hamburger}
        >
          {openMenu ? (
            <Image src={CloseIcon} width={30} alt="Close menu" />
          ) : (
            <Image src={Hambrger} width={30} alt="Open menu" />
          )}
        </button>
      </div>
    </nav>
  );
}
