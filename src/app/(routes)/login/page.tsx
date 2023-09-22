import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from './page.module.scss'

export default function Login() {
  return (
    <PageContainer>
      <h1 className={styles.header}>Hello, it's nice to see you again!</h1>
      <div className={styles.formContainer}>
      <Input name="login" label="Login *" />
      </div>
    </PageContainer>

  )
}
