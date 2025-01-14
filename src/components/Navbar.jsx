import { NavLink } from 'react-router-dom';
import { FaCocktail } from "react-icons/fa";
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <FaCocktail className={styles['navbar-icon']} />
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => isActive ? styles.active : undefined}>Accueil</NavLink>
        </li>
        <li>
          <NavLink to='/about' className={({ isActive }) => isActive ? styles.active : undefined}>À propos</NavLink>
        </li>
      </ul>
    </nav>
  );
}