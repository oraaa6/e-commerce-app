'use client'

import { PrivateRoute } from "@/components/private-route/private-route";
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
import { toast } from "react-toastify";
import { useRouter } from "next/router";


type FormValues = {
  login: string;
  password: string;
  passwordConfirmation: string;
}

function Profile() {

  const { currentUser, changePassword } = useAuth()
  const router = useRouter()
  const { handleSubmit, control, watch, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: currentUser?.email!,
      password: '',
      passwordConfirmation: ''
    }
  })

  const currentPassword = watch('password')

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()

    try {
      await changePassword(currentUser!, data.password)
      router.push('/')
      toast.success('Password successfuly changed')
    } catch {
      setError('root', { message: 'Failed to change password. Try later' })
    }

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Update your profile!</h1>
      <div className={styles.formContainer}>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="login"
            render={({ field: { value }}) => (
              <Input name="login" label="Login" value={value} disabled/>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ validate: strongPasswordValidation }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="password" label="Password" value={value} onChange={onChange} errorMessage={error?.message} placeholder="Leave blank to keep the same"/>
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            rules={{ validate: value => value === currentPassword || 'Password and Password Confirmation don\'t match' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input name="password-confirmation" label="Password Confirmation" value={value} onChange={onChange} errorMessage={error?.message} placeholder="Leave blank to keep the same"/>
            )}
          />
          <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
          <Button>Cancel</Button>
          <p>{errors.root?.message}</p>
        </form>
      </div>
    </PageContainer>

  )
}

  export default PrivateRoute(Profile)