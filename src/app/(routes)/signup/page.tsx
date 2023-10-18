"use client";

import { Input } from "@/components/input/input";
import { PageContainer } from "@/components/page-container/page-container";
import styles from "./page.module.scss";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/button/button";
import { useAuth } from "@/context/auth-context";
import { BaseSyntheticEvent } from "react";
import { validateEmail } from "@/utils/email-validation";
import { strongPasswordValidation } from "@/utils/strong-password-validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Check from "assets/svg/check.svg";
import Image from "next/image";
import { toast } from "react-toastify";

type FormValues = {
  login: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const { signup } = useAuth();
  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isDirty, isValid, errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      login: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const router = useRouter();
  const currentPassword = watch("password");

  const onSubmit = async (data: FormValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const { login, password } = data;

    try {
      await signup(login, password);
      router.push("/");
      toast.success("Sign up successful", {
        icon: () => <Image src={Check} alt="check" height={50} />,
      });
    } catch {
      setError("root", { message: "Failed to create an account. Try later" });
    }
    (["password", "login", "passwordConfirmation"] as const).forEach((field) =>
      setValue(field, "")
    );
  };

  return (
    <PageContainer>
      <h1 className={styles.header}>Hello, nice to meet you!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          control={control}
          name="login"
          rules={{
            required: { value: true, message: "Login is required" },
            validate: validateEmail,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              name="login"
              label="Login *"
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: { value: true, message: "Password is reqired" },
            validate: strongPasswordValidation,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              name="password"
              withIcon
              inputType="password"
              label="Password *"
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          rules={{
            required: { value: true, message: "Password is reqired" },
            validate: (value) =>
              value === currentPassword ||
              "Password and Password Confirmation don't match",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              name="password-confirmation"
              withIcon
              inputType="password"
              label="Password Confirmation *"
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />
        <Button
          type="submit"
          disabled={!isDirty || !isValid || isSubmitting}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
        <p className={styles.submitError}>{errors.root?.message}</p>
      </form>
      <p className={styles.linkParagraph}>
        Already have an account?{" "}
        <Link className={styles.link} href="/login">
          Log in
        </Link>
      </p>
    </PageContainer>
  );
}
