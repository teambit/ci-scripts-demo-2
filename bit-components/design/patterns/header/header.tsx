import React from 'react';
import styles from './header.module.css';

export type HeaderProps = {
  /**
   * The logo to display in the header
   */
  logo?: React.ReactNode;
  /**
   * Navigation items to display in the header
   */
  navItems?: Array<{
    label: string;
    href: string;
  }>;
  /**
   * User menu items to display in the header
   */
  userMenuItems?: Array<{
    label: string;
    onClick: () => void;
  }>;
  /**
   * Whether the header is fixed at the top
   */
  fixed?: boolean;
  /**
   * Optional data-testid for testing
   */
  'data-testid'?: string;
};

export function Header({
  logo,
  navItems = [],
  userMenuItems = [],
  fixed = false,
  'data-testid': testId,
}: HeaderProps) {
  return (
    <header 
      className={`${styles.header} ${fixed ? styles.fixed : ''}`}
      data-testid={testId}
    >
      <div className={styles.container}>
        {logo && (
          <div className={styles.logo}>
            {logo}
          </div>
        )}
        
        {navItems.length > 0 && (
          <nav className={styles.nav}>
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={styles.navItem}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {userMenuItems.length > 0 && (
          <div className={styles.userMenu}>
            {userMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={styles.userMenuItem}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
