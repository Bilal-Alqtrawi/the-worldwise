import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css"; // we can destruture it {nav} but not best practice
function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
