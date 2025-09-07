import styles from "./CityList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import { useCities } from "../context/useCities";

function CityList() {
  const { cities, loading: isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by click on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities?.map((city, index) => (
        <CityItem key={index} city={city} />
      ))}
    </ul>
  );
}
export default CityList;
