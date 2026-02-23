import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Message from './Message';
import Spinner from './Spinner';

interface City {
    id: string | number;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
}

export default function CountryList({ cities, isLoading } : { cities: City[], isLoading: boolean }) {   
    if (isLoading) {
        return <Spinner />
    }

    if (cities.length === 0) {
        return <Message message="Add your first city!" />
    }

    return (
        <ul className={styles.countryList}>
            {cities.map(country => (
                <CountryItem country={country} key={country.id} />
            ))}
        </ul>
    );
}