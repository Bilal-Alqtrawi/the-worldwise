import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      //   return { user: action.payload, isAuthenticated: true }; we update everything here
      return { ...state, user: action.payload, isAuthenticated: true }; // but here make the our code more future proof
    case "logout":
      //   return initialState;
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case "invalid":
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      throw new Error("Unkown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// Custom provider
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  //   We can pass dispatch instead of the login function, but here we have functionality
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: "login",
        payload: {
          FAKE_USER,
        },
      });
    } else {
      dispatch({
        type: "invalid",
        payload: "please Enter valid data 🙃",
      });
    }
  }
  function logout() {
    dispatch({
      type: "logout",
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
