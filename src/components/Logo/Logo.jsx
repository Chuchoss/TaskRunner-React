import React from 'react'
import Tomato from '../../icons/Tomato'
import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={styles.logoWrapper}>
       <Tomato />
       <span className={styles.textLogo}>pomodoro_box</span>
    </div>
  )
}
