
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"



import { useState, type ChangeEvent } from "react";



import styles from "./Form.module.css";

import Button from "./Button";

import BackButton from "./BackButton";

import { useCities } from "../context/CitiesContext";



// eslint-disable-next-line react-refresh/only-export-components

export function convertToEmoji(countryCode: string) {

  const codePoints = countryCode

    .toUpperCase()

    .split("")

    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);

}



function Form() {

  const [cityName, setCityName] = useState<string>("");

  const [country, setCountry] = useState<string>("");

  const [date, setDate] = useState<Date>(new Date());

  const [notes, setNotes] = useState<string>("");



  const { createCity } = useCities();



  const handleCityNameChange = (e: ChangeEvent<HTMLInputElement>) =>

    setCityName(e.target.value);

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) =>

    setCountry(e.target.value);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) =>

    setDate(new Date(e.target.value));

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) =>

    setNotes(e.target.value);



  async function handleSave(e: React.MouseEvent) {

    e.preventDefault();

    if (!cityName) return;



    // Try to fetch a position for the city using Nominatim (best-effort)

    let position = { lat: 0, lng: 0 };

    try {

      const q = encodeURIComponent(cityName + (country ? ` ${country}` : ""));

      const res = await fetch(

        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,

        { headers: { "Accept-Language": "en" } }

      );

      const json = await res.json();

      if (Array.isArray(json) && json.length > 0) {

        position = { lat: Number(json[0].lat), lng: Number(json[0].lon) };

      }

    } catch (err) {

      // ignore geocoding failures — position will be 0,0

      console.warn("Geocoding failed:", err);

    }



    const newCity = {

      cityName,

      country,

      emoji: country ? convertToEmoji(country) : "",

      date: date.toISOString(),

      notes,

      position,

    };



    await createCity(newCity);



    // reset form fields

    setCityName("");

    setCountry("");

    setDate(new Date());

    setNotes("");

  }



  return (

    <form className={styles.form}>

      <div className={styles.row}>

        <label htmlFor="cityName">City name</label>

        <input id="cityName" onChange={handleCityNameChange} value={cityName} />

      </div>



      <div className={styles.row}>

        <label htmlFor="country">Country code (e.g. PT)</label>

        <input id="country" onChange={handleCountryChange} value={country} />

      </div>



      <div className={styles.row}>

        <label htmlFor="date">When did you go to {cityName}?</label>

        <input

          id="date"

          onChange={handleDateChange}

          value={date.toISOString().split("T")[0]}

        />

      </div>



      <div className={styles.row}>

        <label htmlFor="notes">Notes about your trip to {cityName}</label>

        <textarea id="notes" onChange={handleNotesChange} value={notes} />

      </div>



      <div className={styles.buttons}>

        <Button onClick={handleSave} type="primary">

          Save

        </Button>

        <BackButton />

      </div>

    </form>

  );

}



export default Form;

