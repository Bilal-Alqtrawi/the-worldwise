import Sidebar from "./Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map";
import { useCities } from "../context/useCities";

function AppLayout() {
  const { cities } = useCities();

  return (
    <div className={`${styles.app} container`}>
      <Sidebar />
      <Map cities={cities} />
    </div>
  );
}

export default AppLayout;
