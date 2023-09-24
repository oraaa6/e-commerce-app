'use client'

import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from './page.module.scss'
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/button/button";
import { validateEmail } from "@/utils/email-validation";
import { BaseSyntheticEvent } from "react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  login: string;
  password: string;
}

export default function Login() {
const { login } = useAuth()
const router = useRouter()
  const { handleSubmit, control, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
    }
  })
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()

    try {
      await login(data.login, data.password)
      router.push('/')
      toast.success('Login successful')
    } catch {
      setError('root', { message: 'Failed to log in. Email or password may be invalid' })
    }

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Hello, it's nice to see you again!</h1>
      <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
            control={control}
            name="login"
            rules={{ required: { value: true, message: 'Login is reqired' }, validate: validateEmail }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="login" label="Login *" value={value} onChange={onChange} errorMessage={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: { value: true, message: 'Password is reqired' }, }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="password" label="Password *" value={value} onChange={onChange} errorMessage={error?.message} />
            )}
          />
            <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
          <p>{errors.root?.message}</p>
        </form>
        <p>Need an account? <Link href="/signup">Sign up</Link></p>
      </div>
    </PageContainer>

  )
}
