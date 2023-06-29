"use client";

import styles from "./nav-bar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/svg/logo.svg";
import Hambrger from "../../assets/png/hamburger.png";
import CloseIcon from "../../assets/png/cross-button.png";
import Bag from "../../assets/svg/bag.svg";
import { useState } from "react";

export function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className={styles.navigation}>
      <div className={styles.contentContainer}>
        <Link href="/">
          <Image
            className={styles.fox}
            src={Logo}
            alt="Fox shop logo"
            width={140}
          />
        </Link>
        <div className={`${styles.linksContainer} ${openMenu ? "open" : ""}`}>
          <ul className={styles.links}>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/cart">
                <Image
                  className={styles.bag}
                  src={Bag}
                  alt="Your shopping bag"
                  width={40}
                  height={36}
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
            <Image src={CloseIcon} width={40} alt="Close menu" />
          ) : (
            <Image src={Hambrger} width={40} alt="Open menu" />
          )}
        </button>
      </div>
    </nav>
  );
}
