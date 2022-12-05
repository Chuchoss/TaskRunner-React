import React from "react";
import Settings from "../../icons/Settings";
import Statistic from "../../icons/Statistic";
import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.containerHeader}>
        <Link to='/'>
          <Logo />
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.link} to='/statistic'>
            <Statistic /> Статистика
          </Link>
          <Link className={styles.link} to='/settings'>
            <Settings /> Настройки
          </Link>
        </nav>
      </section>
    </header>
  );
}
