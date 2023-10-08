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
import { Dropdown } from "@/components/dropdown/dropdown";
import clsx from "clsx";
import { useCloseMenuByEscape } from "@/hooks/use-close-menu-by-escape";

export function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter()

  useCloseMenuByEscape({ setOpen: setOpenMenu })

  useEffect(() => {
    if (openMenu === true) {
      window.document.body.style.overflow = 'hidden'
    } else {
    window.document.body.style.overflow = 'visible' }
  }, [openMenu])

  useEffect(() => {
    setOpenMenu(false)
  }, [])

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
        <Link href="/" className={styles.foxLink} onClick={() => setOpenMenu(false)}>
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

        <ul className={styles.profileContainer}>
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
          <li className={styles.cartLink}>
            <Dropdown options={[{ label: 'SIGN UP', href: "/signup" }, { label: currentUser ? 'LOGOUT' : "LOGIN", href: currentUser ? undefined : "/login", onClick: currentUser ? onLogOut : undefined }, { label: 'PROFILE', href:  currentUser ? '/profile' :'/login' }]} trigger={<Image
              className={styles.user}
              src={User}
              alt="profile"
              height={35}
            />} /></li>
        </ul>

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
        <ul className={clsx(styles.categoriesContainer, openMenu && styles.open)}>
          <li className={styles.categoryLink}>
            <Link href="/men">
              Men's
            </Link>
          </li>
          <li className={styles.categoryLink}>
            <Link href="/women">
              Women's
            </Link>
          </li>
          <li className={styles.categoryLink}>
            <Link href="/jewelery">
              Jewelery
            </Link>
          </li>
          <li className={styles.categoryLink}>
            <Link className={styles.categoryLink} href="/tech">
              Tech
            </Link>
          </li>
          <li className={styles.categoryLink}>
            <Link href="/sale">
              Sale
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
