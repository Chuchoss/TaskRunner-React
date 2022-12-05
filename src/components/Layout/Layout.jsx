import React from 'react';
import styles from './Layout.module.scss';

export function Layout({ children }) {
  return (
    <div className={styles.layout}>
       {children}
    </div>
  );
}