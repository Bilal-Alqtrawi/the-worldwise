import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { getCurrentUser, logout } from "../services/apiAuth";
// import Uploader from "../data/Uploader";

function PageNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const ref = useRef(null);
  const btnRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    checkUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!navRef.current || !btnRef.current) return;

      // If click is outside both the nav menu and the toggle button, close
      if (
        !navRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        // e.stopPropgation();
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/login");
  }

  return (
    <nav className={styles.nav} ref={ref}>
      <Link to="/">
        <Logo />
      </Link>
      <ul className={styles["nav-links"]}>
        <li>
          <NavLink className="nav-link test" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/pricing">
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/product">
            Product
          </NavLink>
        </li>

        {!user ? (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink onClick={handleLogout} className={styles.ctaLink}>
              Logout
            </NavLink>
          </li>
        )}
        {/* <Uploader /> */}
      </ul>

      <button
        ref={btnRef}
        className={`${styles["toggle-bar-btn"]} ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <ul ref={navRef} className={styles["nav-mobile"]}>
          <li>
            <NavLink className="nav-link test" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/pricing">
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/product">
              Product
            </NavLink>
          </li>

          {!user ? (
            <li>
              <NavLink to="/login" className={styles.ctaLink}>
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink onClick={handleLogout} className={styles.ctaLink}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default PageNav;
