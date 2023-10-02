'use client'

import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from './page.module.scss'
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/button/button";
import { validateEmail } from "@/utils/email-validation";
import { BaseSyntheticEvent, useState } from "react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import Check from 'assets/svg/check.svg'
import Image from "next/image";


type FormValues = {
  login: string;
  password: string;
}

export default function Login() {

  const { login } = useAuth()
  const router = useRouter()
  const { handleSubmit, setValue, control, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: ''
    }
  })
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()

    try {
      await login(data.login, data.password)
      router.push('/')
      toast.success('Login successful', {
        icon: () =>
        (<Image
          src={Check}
          alt="check"
          height={50} />)
      })
    } catch {
      setError('root', { message: 'Failed to log in. Email or password may be invalid' })
    }

    (['password', 'login'] as const).forEach((field) => setValue(field, ''))

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Hello, it's nice to see you again!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="login"
          rules={{ required: { value: true, message: 'Login is required' }, validate: validateEmail }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="login" label="Login *" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: { value: true, message: 'Password is required' }, }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="password" withIcon inputType="password" label="Password *" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting} style={{ marginTop: 20 }}>Submit</Button>
        <p className={styles.submitError}>{errors.root?.message}</p>
      </form>
      <p className={styles.linkParagraph}>Need an account? <Link className={styles.link} href="/signup">Sign up</Link></p>
      <p className={styles.linkParagraph}>Forgot password? <Link className={styles.link} href="/forgot-password">Change it</Link></p>
    </PageContainer>

  )
}
