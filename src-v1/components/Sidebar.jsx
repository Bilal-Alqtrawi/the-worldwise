import { NavLink } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/* We will this Component, So When we go to in URL to like this:
      Ex:
      http://localhost:5173/app/countries
      http://localhost:5173/app/cities 
      here will display the element we passed into the nested route
      */}

        
      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
