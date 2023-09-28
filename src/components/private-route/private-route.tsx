
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { ComponentType, ReactNode } from "react";

  export function PrivateRoute<T extends object>(Component: ComponentType<T>) {
    return (hocProps: T) => {
        const { currentUser } = useAuth()

        return (currentUser ? <Component {...hocProps as T}/> : redirect("/login"))
    }

  }
