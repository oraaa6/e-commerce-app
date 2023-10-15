import { useAuth } from "@/context/auth-context";
import styles from "./avatar.module.scss"
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/button/button";

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}


export function Avatar() {

    const { currentUser, uploadAvatar } = useAuth();
    const [photo, setPhoto] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        if (!target.files) {
            return null
        }
        else {
            setPhoto(target.files[0])
        }

    }

    function handleClick() {
        if (photo && currentUser) {
            uploadAvatar(photo, currentUser, setLoading);
        }
    }

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser])

    return (<div className={styles.fields}>
        <img src={photoURL} alt="Avatar" className={styles.avatar} />
        <div className={styles.buttonsContainer}>     <input type="file"  accept="image/png, image/gif, image/jpeg" className={styles.fileInput} onChange={handleChange} />
            <Button slim disabled={loading || !photo} onClick={handleClick}>Upload</Button></div>


    </div>)
}
