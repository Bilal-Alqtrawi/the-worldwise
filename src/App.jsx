import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";

import CityList from "./components/CityList.jsx";
import City from "./components/City.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form";
import CitiesProvider from "./context/CitiesContext.jsx";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <CitiesProvider>
                <AppLayout />
              </CitiesProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="cities" replace />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
