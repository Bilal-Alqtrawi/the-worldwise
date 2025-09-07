import styles from "./CityItem.module.css";

import FlagEmojiToPNG from "./FlagEmojiToPNG";

import { formatDate } from "../utils/.";
import { Link } from "react-router-dom";
import { useCities } from "../context/useCities";

function CityItem({ city }) {
  const { removeCity } = useCities();

  if (!city) return null;

  const { cityName, emoji, date, position, id } = city;

  return (
    <Link
      to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
      className={styles.cityItem}
    >
      <span className={styles.emoji}>
        <FlagEmojiToPNG flag={emoji} />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.preventDefault();
          removeCity(id);
        }}
      >
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
