import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Product from "./pages/Pricing";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:9000";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      {/* this alwais show in the page */}
      {/* <h1>React Router Dom</h1> */}

      {/* the content of the page will change based on the url */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<div className="form">Form</div>} />
          </Route>
          {/* this will show when the url does not match any of the above routes */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
