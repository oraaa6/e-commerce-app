'use client'

import { PrivateRoute } from "@/components/private-route/private-route";
import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from './page.module.scss'
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/button/button";
import { useAuth } from "@/context/auth-context";
import { BaseSyntheticEvent } from "react";
import { strongPasswordValidation } from "@/utils/strong-password-validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Check from 'assets/svg/check.svg'
import Image from "next/image";


type FormValues = {
  login: string;
  name?: string;
  surname?: string;
  address?: string;
  postcode?: string;
  password?: string;
  passwordConfirmation?: string;
}

function Profile() {

  const { currentUser, changePassword } = useAuth()
  const router = useRouter()
  const { handleSubmit, reset, setValue, control, watch, formState: { isDirty, isValid, errors, isSubmitting }, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      login: currentUser?.email!,
      name: '',
      surname: '',
      address: '',
      postcode: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  const currentPassword = watch('password')

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault()

    try {
      if (data.password) {
        await changePassword(currentUser!, data.password)
        router.push('/')
        toast.success('Password successfuly changed', {
          icon: () =>
          (<Image
            src={Check}
            alt="check"
            height={50} />)
        })
      }

    } catch (error) {
      // console.log(error)
      //   (['password', 'passwordConfirmation'] as const).forEach((field) => setValue(field, ''))
      setError('root', { message: 'Failed to change password. Try later' })
    }

  }

  return (
    <PageContainer>
      <h1 className={styles.header}>Update your profile!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input name="login" label="Login" value={currentUser?.email!} disabled />
        <Controller
          control={control}
          name="name"
          rules={{ required: false, minLength: { value: 3, message: 'Name should have at least 3 characters' }, maxLength: { value: 50, message: 'Name should have less than 50 characters' } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="name" label="Name" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="surname"
          rules={{ required: false, minLength: { value: 3, message: 'Surname should have at least 3 characters' }, maxLength: { value: 50, message: 'Surname should have less than 50 characters' } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="surname" label="Surname" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{ required: false, minLength: { value: 3, message: 'Address should have at least 3 characters' }, maxLength: { value: 50, message: 'Address should have less than 50 characters' } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="address" label="Address" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="postcode"
          rules={{ required: false, minLength: { value: 3, message: 'Postcode should have at least 3 characters' }, maxLength: { value: 50, message: 'Postcode should have less than 10 characters' } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="postcode" type="number" label="Postcode" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: false, validate: strongPasswordValidation }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="password" withIcon inputType="password" label="New password" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          rules={{ required: false, validate: value => value === currentPassword || 'Password and Password Confirmation don\'t match' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input name="password-confirmation" withIcon inputType="password" label="Password Confirmation" value={value} onChange={onChange} errorMessage={error?.message} />
          )}
        />
        <div className={styles.buttonsContainer}>
          <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</Button>
          <Button onClick={() => reset()}>Cancel</Button>
        </div>

        <p className={styles.submitError}>{errors.root?.message}</p>
      </form>
    </PageContainer>

  )
}

export default PrivateRoute(Profile)