import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/apiAuth";
import SpinnerFullPage from "../components/SpinnerFullPage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(
    function () {
      async function checkAuth() {
        try {
          const user = await getCurrentUser();

          if (!user) {
            navigate("/login", { replace: true });
          } else {
            setIsAuthenticated(true);
          }
        } catch (err) {
          navigate("/login", { replace: true }); // if error also
        } finally {
          setIsChecking(false);
        }
      }

      checkAuth();
    },
    [navigate]
  );

  if (isChecking) return <SpinnerFullPage />;

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
