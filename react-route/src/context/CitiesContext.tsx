import { createContext, useContext, useEffect, useState } from "react";
import type { City } from "../models/City";

const BASE_URL = "http://localhost:9000";

interface CitiesContextType {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: string) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL + "/cities");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string) {
    try {
      setIsLoading(true);
      const res = await fetch(BASE_URL + "/cities/" + id);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Error fetching city:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context == undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
