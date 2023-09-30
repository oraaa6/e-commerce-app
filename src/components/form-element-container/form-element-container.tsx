
import { ReactNode } from "react"
import styles from "./form-element-container.module.scss"



export function FormElementContainer({ children }: { children: ReactNode }) {
    return (
        <div className={styles.container}>
            {children}
        </div>)
}