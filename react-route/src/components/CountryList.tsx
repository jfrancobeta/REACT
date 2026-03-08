import { useCities } from '../context/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Message from './Message';
import Spinner from './Spinner';

export default function CountryList() {   
    const { cities, isLoading } = useCities();
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