import Image from "next/image";
import FashionHeader from 'assets/svg/header-fashion-sale.svg'
import styles from './nav-cover.module.scss'

export function NavCover () {
    return (
    <div className={styles.coverContainer}>
        <Image
        className={styles.cover}
        src={FashionHeader}
        alt="Fox shop logo"
        height={500}
      />
      </div>
    )
}