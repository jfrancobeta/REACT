import { Link } from "react-router-dom";
import style from "./CityItem.module.css";

interface City {
  id: string | number;
  cityName: string;
  emoji: string;
  date: string;
  position : {
    lat: number;
    lng: number;
  };
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};

export default function CityItem({ city }: { city: City }) {
  return (
    <li >
      <Link className={style.cityItem} to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
        <span className={style.emoji}>{city.emoji}</span>
        <h3 className={style.name}>{city.cityName}</h3>
        <time className={style.date}>{formatDate(city.date)}</time>
        <button className={style.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
