import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import { useCities } from "../context/useCities";
import Message from "./Message";
import DatePicker from "react-datepicker";
import { getDate } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Form() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { createCity, dispatch } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [emoji, setEmoji] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCity() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "doesn't seem to be a city. Click somewhere else 😉"
            ); // if click on Sed as like

          console.log(data);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName.split(",", 1)[0]);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          dispatch({
            type: "rejected",
            payload: "There was error in loaded city",
          });
        } finally {
          setIsLoading(false);
        }
      }
      fetchCity();
    },
    [dispatch, lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName, // when fetch we chnage it
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    console.log(newCity);

    await createCity(newCity);

    setTimeout(function () {
      navigate("/app");
    }, 50);
  }

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere in map" />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled={isLoading}
        />
        <span className={styles.flag}>
          {emoji ? flagemojiToPNG(emoji) : ""}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DateInput selectedDate={date} setSelectedDate={setDate} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back">&larr; Back</Button>
      </div>
    </form>
  );
}

function DateInput({ selectedDate, setSelectedDate }) {
  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    return <span title={tooltipText}>{getDate(date)}</span>;
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      renderDayContents={renderDayContents}
      className={styles.datePicker}
    />
  );
}

export default Form;
