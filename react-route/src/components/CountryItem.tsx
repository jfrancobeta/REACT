import styles from "./CountryItem.module.css";
interface City {
    id: string | number;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
}

function CountryItem({ country }: { country: City }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
