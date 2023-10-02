import * as React from 'react';
import { ReactNode, useState } from 'react';
import styles from './dropdown.module.scss'
import Link from 'next/link';

type Option = {
  label: ReactNode;
  href?: string;
}

export function Dropdown({options, trigger}: {options: Option[], trigger: ReactNode}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.trigger} onClick={handleOpen}>{trigger}</button>
      {open ? (
        <ul className={styles.menu}>
          {options.map(({ label, href }) => (
            href ? 
            <Link href={href}>{label}</Link> :
              <li className={styles.menuItem}>
                <button>{label}</button>
              </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
