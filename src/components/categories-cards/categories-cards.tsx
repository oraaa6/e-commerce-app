'use client'

import styles from "./categories-card.module.scss"
import Image from "next/image";
import Man from "@/assets/png/man.jpg"
import Woman from "@/assets/png/woman.jpg"
import Jewelery from "@/assets/png/jewelery.jpg"
import Tech from "@/assets/png/tech.jpg"
import Sale from '@/assets/png/sale.jpg'
import Link from "next/link";


export function CategoriesCards() {
  return (
  <div className={styles.categoriesSection}>
    <h1 className={styles.header}>Search out by categories</h1>
    <div className={styles.categoriesContainer}>
        <div className={styles.firstCategories}>
        <div className={styles.categoryContainer}>
            <h5 className={styles.categoryHeader}>Men's</h5>
            <Link href="/men"> 
        <Image
          src={Man}
          alt="Man"
          className={styles.categoryImage}
        /></Link>
        </div>
        <div className={styles.categoryContainer}>
            <h5 className={styles.categoryHeader}>Women's</h5>
            <Link href="/woman"> 
        <Image
          src={Woman}
          alt="Woman"
          className={styles.categoryImage}
        /></Link>
        </div>
        <div className={styles.categoryContainer}>
            <h5 className={styles.categoryHeader}>Jewelery</h5>
            <Link href="/jewelery"> 
        <Image
          src={Jewelery}
          alt="Jewelery"
          className={styles.categoryImage}
        /></Link>
        </div>
        </div>
        <div className={styles.lastCategories}>
        <div className={styles.categoryContainer}>
            <h5 className={styles.categoryHeader}>Tech</h5>
            <Link href="/tech"> 
        <Image
          src={Tech}
          alt="Tech"
          className={styles.categoryImage}
        /></Link>
        </div>
        <div className={styles.categoryContainer}>
            <h5 className={styles.categoryHeader}>Sale</h5>
            <Link href="/sale"> 
        <Image
          src={Sale}
          alt="Sale"
          className={styles.categoryImage}
        /></Link>
        </div>
        </div>
        </div>
  </div>
  )
}
