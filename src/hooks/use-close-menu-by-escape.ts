import { useEffect } from "react"

export function useCloseMenuByEscape({setOpen}: {setOpen: (opened: boolean) => void}) {
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
          if (event.code === 'Escape') {
            setOpen(false)
          }
        }
    
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [])
}