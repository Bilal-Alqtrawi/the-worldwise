import { createContext, useCallback, useEffect, useReducer } from "react";
import { addCity, deleteCity, getCities, getCity } from "../services/apiCities";

export const CitiesContext = createContext();

const initialState = {
  cities: [],
  city: {}, // cuurrent City
  loading: false,
  error: null,
};

// current State, action object in almost case
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload,
        error: null,
      };

    case "city/loaded":
      return {
        ...state,
        city: action.payload,
        loading: false,
      };
    case "city/deleted":
      return {
        ...state,
        city: {},
        cities: state.cities.filter((city) => city?.id !== action.payload),
        loading: false,
      };
    case "city/created":
      return {
        ...state,
        city: action.payload,
        cities: [...state.cities, action.payload],
        loading: false,
      };

    case "rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default function CitiesProvider({ children }) {
  const [{ cities, city, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({
          type: "loading",
        });

        const data = await getCities();

        console.log(data);
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        console.error("Error In Fetching Cities Data");
        dispatch({
          type: "rejected",
          payload: error.message,
        });
      }
    }

    fetchCities();
  }, []);

  const fetchCity = useCallback(
    async function fetchCity(id) {
      if (Number(id) === city?.id) return; // no need to all API again

      try {
        dispatch({ type: "loading" });

        const data = await getCity(id);

        dispatch({
          type: "city/loaded",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    },
    [city?.id]
  );

  async function createCity(newCity) {
    console.log(newCity);
    try {
      dispatch({
        type: "loading",
      });

      await addCity(newCity);

      dispatch({
        type: "city/created",
        payload: newCity,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was error in Creating City",
      });
    }
  }

  async function removeCity(id) {
    try {
      dispatch({ type: "loading" });

      await deleteCity(id);
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        city,
        loading,
        error,
        fetchCity,
        createCity,
        removeCity,
        dispatch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
