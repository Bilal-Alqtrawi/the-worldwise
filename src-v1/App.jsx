import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// We will lazy load these
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// Lazy function => feature , the vite or webpack will automatically split bundle when see the Lazyfunction
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import SpinnerFullPage from "./components/SpinnerFullPage";

/* 
dist/assets/index-d414d897.css   46.32 kB │ gzip:  11.44 kB
dist/assets/index-e4cc08bd.js   540.74 kB │ gzip: 158.41 kB 
*/

import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

function App() {
  return (
    <AuthProvider> 
      <CitiesProvider>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
          }}
        >
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path='/ element={<Homepage />} />
        Can with index make this route default page
        */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {/* Will Rendered if the auth is allow */}
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* index for default Opend one of these elements routes */}
                <Route index element={<Navigate replace to="cities" />} />
                {/* Not need to delecare parent path */}
                <Route path="cities" element={<CityList />} />
                <Route
                  // /:id => params
                  path="cities/:id"
                  element={<City />}
                />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );

  //     "server": "json-server --watch data/cities.json --port 8000"

  // );

  /*  return (
    <div>
  //  Will stay in page  }
  //   <h1>Hello Router</h1>
  //   <BrowserRouter>
  //     <Routes>
  //       {/* this path / => mean root path */
  //       {/* each Component matches that part of the URL  */}
  //       <Route path="/" element={<Homepage />} />
  //       {/* Define URL, each path, we will define one component, element it's React Element */}
  //       <Route path="product" element={<Product />} />
  //       {/* pass props into this element */}
  //       <Route path="pricing" element={<Pricing />} />
  //     </Routes>
  //   </BrowserRouter>
  // </div>
  // );
  // */
}

export default App;
