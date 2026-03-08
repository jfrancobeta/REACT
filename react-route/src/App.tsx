import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Product from "./pages/Pricing";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import City from "./components/City";

function App() {
  return (
    <CitiesProvider>
      <div>
        {/* this alwais show in the page */}
        {/* <h1>React Router Dom</h1> */}

        {/* the content of the page will change based on the url */}
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            {/* this will show when the url does not match any of the above routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CitiesProvider>
  );
}

export default App;
