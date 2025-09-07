import { useEffect, useState } from "react";
import { formatDate } from "../utils/index";
import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../context/useCities";
import Button from "./Button";
import FlagEmojiToPNG from "./FlagEmojiToPNG";
import Spinner from "./Spinner";

function City() {
  const { city, fetchCity: getCity, loading } = useCities();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = city || {};

  console.log(city);

  if (loading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        {emoji && (
          <h3>
            <FlagEmojiToPNG flag={emoji} />
            <span>{cityName}</span>
          </h3>
        )}
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
