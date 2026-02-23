import CityItem from './CityItem';
import styles from './CityList.module.css'
import Message from './Message';
import Spinner from './Spinner';

interface City {
    id: string | number;
    cityName: string;
    emoji: string;
    date: string;
}

export default function CityList({ cities, isLoading } : { cities: City[], isLoading: boolean }) {   
    if (isLoading) {
        return <Spinner />
    }

    if (cities.length === 0) {
        return <Message message="Add your first city!" />
    }

    return (
        <ul className={styles.cityList}>
            {cities.map(city => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}