import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../../src/services/apiAuth";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(function () {
    async function getUser() {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        if (user) {
          setUser(user.user_metadata);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, []);

  async function handleClick() {
    await logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <img src={user?.avatar || "/default-avatar.jpg"} alt={user?.name} />
          <span>Welcome, {user?.fullName?.split(" ")[0] || "User"}</span>
          <button onClick={handleClick}>Logout</button>
        </>
      )}
    </div>
  );
}

export default User;
