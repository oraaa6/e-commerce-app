import * as React from 'react';
import { ReactNode, useState, useEffect, useRef, KeyboardEventHandler } from 'react';
import styles from './dropdown.module.scss'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import useClickOutside from '@/hooks/use-click-outside';
import { useCloseMenuByEscape } from '@/hooks/use-close-menu-by-escape';
import clsx from 'clsx';

type Option = {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export function Dropdown({ options, trigger, withAvatar = false }: { options: Option[], trigger: ReactNode, withAvatar: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside({ elementRef: dropdownRef, setOpen })

  useCloseMenuByEscape({setOpen})

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef} >
      
      <button className={clsx(styles.trigger, withAvatar && styles.avatar)} onClick={handleOpen}>{trigger}</button>
      {open ? (
        <ul className={styles.menu}>
          {options.map(({ href, label, onClick }) => (
            href ? <Link href={href} className={styles.menuItem} onClick={() => setOpen(false)}>{label}</Link> :
              <li className={styles.menuItem}>
                <button className={styles.menuItem} onClick={() => {
                  setOpen(false);
                  if (onClick) {
                    onClick()
                  }
                }}>{label}</button>
              </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};


