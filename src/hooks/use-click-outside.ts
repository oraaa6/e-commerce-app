import { MutableRefObject, useEffect } from "react";

export default function useClickOutside({ elementRef, setOpen }: { elementRef: MutableRefObject<HTMLDivElement | null>, setOpen: (closed: boolean) => void }) {

    useEffect(() => {
        const handleClickOutside = ({ target }:  MouseEvent | TouchEvent) => {
            if (elementRef && !elementRef?.current?.contains(target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
}

