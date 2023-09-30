"use client";

import styles from "./nav-bar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "assets/svg/logo.svg";
import Hambrger from "assets/png/hamburger.png";
import CloseIcon from "assets/png/cross-button.png";
import Bag from "assets/svg/bag.svg";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchInput } from "components/search-input/search-input";
import { useAuth } from "@/context/auth-context";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Check from 'assets/svg/check.svg'
import Cross from 'assets/svg/cross.svg'
import User from 'assets/svg/user.svg'

export function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  const { currentUser, logout } = useAuth()

  const onLogOut = async () => {
    try {
      await logout()
      if (pathname !== '/') {
        router.push("/")
      }
      toast.success('Logout successful', {
        icon: () =>
        (<Image
          src={Check}
          alt="check"
          height={50} />)
      })
    }
    catch {
      toast.error('Logout failed', {
        icon: () =>
        (<Image
          src={Cross}
          alt="check"
          height={50} />)
      })
    }
  }

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
            height={90}
          />
        </Link>
        <div className={styles.searchInput}>
          <SearchInput />
        </div>
        <div className={`${styles.linksContainer} ${openMenu ? "open" : ""}`}>
          <ul className={styles.links}>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li>
              {currentUser ? <button onClick={onLogOut} className={styles.logoutButton}>LOGOUT</button> : <Link href="/login">LOGIN</Link>}
            </li>
            <li className={styles.profileLink}>
              <Link href={currentUser ? "/profile" : "/login"}>
                <Image
                  className={styles.user}
                  src={User}
                  alt="profile"
                  height={35}
                />
              </Link>
            </li>
            <li className={styles.cartLink}>
              <Link href="/cart">
                <div className={styles.amountCart}>5</div>
                <Image
                  className={styles.bag}
                  src={Bag}
                  alt="Your shopping bag"
                  width={25}
                  height={20}
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
