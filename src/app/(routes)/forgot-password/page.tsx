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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  login: string;
  password: string;
}

export default function ForgotPassword() {

  const { handleSubmit, control, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: ''
    }
  })

  const {resetPassword} = useAuth()
  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()
    try {
      await resetPassword(data.login)
      toast.success('Check your password for further instructions')
    } catch {
      setError('root', { message: 'Failed to reset password' })
    }

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Remind password</h1>
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
            <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
          <p>{errors.root?.message}</p>
        </form>
       <Link href="/login">Log in</Link>
      </div>
    </PageContainer>

  )
}
