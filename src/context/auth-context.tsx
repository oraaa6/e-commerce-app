'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { auth, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User, UserCredential, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateCurrentUser, updatePassword, updatePhoneNumber, updateProfile, validatePassword } from "firebase/auth";


type AuthContextType = {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<UserCredential>,
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (user: User, newPassword: string) => Promise<void>;
    uploadAvatar: (file: File, currentUser: User, setLoading: (isLoading: boolean) => void) => Promise<void>;
    updateNickName: (user: User, displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null, signup: async (email, password) => { return {} as UserCredential }, login: async (email, password) => { return {} as UserCredential }, logout: async () => { }, resetPassword: async (email) => { }, changePassword: async (user, newPassword) => { }, uploadAvatar: async (file, currentUser, isLoading) => {},  updateNickName: async (user, displayName) => {} })

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

    async function uploadAvatar(file: File, currentUser: User, setLoading: (isLoading: boolean) => void) {

        const fileRef = ref(storage, currentUser.uid + '.png');
        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
      
        updateProfile(currentUser, {photoURL});
        
        setLoading(false);
        alert("Uploaded file!");
    }

    function updateNickName (currentUser: User, displayName: string) {
        return updateProfile(currentUser, {displayName})
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
        changePassword,
        uploadAvatar,
        updateNickName
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}