'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { User, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateCurrentUser, updatePassword, updateProfile } from "firebase/auth";


type AuthContextType = {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<UserCredential>,
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (user: User, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, signup: async (email, password) => { return {} as UserCredential }, login: async (email, password) => { return {} as UserCredential }, logout: async () => { }, resetPassword: async (email) => { }, changePassword: async (user, newPassword) => { } })

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email)
    }

    function logout() {
        return auth.signOut()
    }
    function changePassword(user: User, newPassword: string) {
        return updatePassword(user, newPassword)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        changePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}