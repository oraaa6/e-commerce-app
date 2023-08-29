import { Button } from "../button/button";
import styles from "./cash-back.module.scss"
import CreditCard from '../../assets/svg/credit-card.svg'
import Image from "next/image";

export function CashBack() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.header}>Get 2% Cash Back</h1>
                    <Button animate>See more</Button>
                </div>
                <div>
                    <Image
                        src={CreditCard}
                        alt="credit-card"
                        className={styles.creditCard}
                        width={200}
                        height={200}
                    />
                </div>
            </div>
        </div>)
}