import Spiner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";
import { useCities } from "../context/useCities";

export default function CountryList() {
  const { cities, loading: isLoading } = useCities();

  if (isLoading) return <Spiner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by click on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}
