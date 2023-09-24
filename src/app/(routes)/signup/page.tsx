'use client'

import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from './page.module.scss'
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/button/button";
import { useAuth } from "@/context/auth-context";
import { BaseSyntheticEvent } from "react";
import { validateEmail } from "@/utils/email-validation";
import { strongPasswordValidation } from "@/utils/strong-password-validation";
import Link from "next/link";


type FormValues = {
  login: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {

  const { signup } = useAuth()
  const { handleSubmit, control, watch, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  const currentPassword = watch('password')

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()
    const { login, password } = data;

    try {
      await signup(login, password)
    } catch {
      setError('root', { message: 'Failed to create an account. Try later' })
    }

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Hello, nice to meet you!</h1>
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
            rules={{ required: { value: true, message: 'Password is reqired' }, validate: strongPasswordValidation }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="password" label="Password *" value={value} onChange={onChange} errorMessage={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            rules={{ required: { value: true, message: 'Password is reqired' }, validate: value => value === currentPassword || 'Password and Password Confirmation don\'t match' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="password-confirmation" label="Password Confirmation *" value={value} onChange={onChange} errorMessage={error?.message} />
            )}
          />
          <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
          <p>{errors.root?.message}</p>
        </form>
        <p>Already have an account? <Link href="/login">Log in</Link></p>
      </div>
    </PageContainer>

  )
}
