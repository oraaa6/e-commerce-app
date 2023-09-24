import { InputHTMLAttributes, useState } from "react"
import styles from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    errorMessage?: string;
}

export function Input({ name, label, errorMessage, ...props }: InputProps) {
    
    return (
        <>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input className={styles.input} name={name} id={name} {...props} />
            <p>{errorMessage}</p>
            </div>
        </>
    )
}