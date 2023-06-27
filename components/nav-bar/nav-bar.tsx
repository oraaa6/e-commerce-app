"use client";

import styles from "./nav-bar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/svg/logo.svg";
import Hambrger from "../../assets/png/hamburger.png";
import CloseIcon from "../../assets/png/cross-button.png";
import { useState } from "react";

export function NavBar() {

  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className={styles.navigation}>
      <Link href="/">
        <Image src={Logo} alt="Fox shop logo" width={130} />
      </Link>

      <ul className={`${styles.links} ${openMenu ? "open" : ""}`}>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
 
        <button
          onClick={() => setOpenMenu((prevState) => !prevState)}
          className={styles.hamburger}
        >
          {openMenu ? (
            <Image src={CloseIcon} alt="Close menu" />
          ) : (
            <Image src={Hambrger} alt="Open menu" />
          )}
        </button>
      </nav>

  );
}
