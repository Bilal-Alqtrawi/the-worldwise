import { useEffect } from "react";
import styles from "./VerifyEmail.module.css";
import { getCurrentUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  // For Check Email Confirmation
  useEffect(
    function () {
      const checkVerification = async () => {
        const user = await getCurrentUser();

        // check email confirmation
        if (user.email_confirmed_at) {
          navigate("/login"); // or to dashboard
        }
      };

      const interval = setInterval(checkVerification, 5000);

      return () => clearInterval(interval);
    },
    [navigate]
  );

  return (
    <main className={styles.verify}>
      <div className={styles.card}>
        <div className={styles.icon}>📧</div>
        <h2 className="text-gradient">Verify Your Email</h2>
        <p className={styles.message}>
          We’ve sent a verification link to your email address. Please check
          your inbox and confirm your account.
        </p>
        <p className={styles.message}>
          Once your email is verified, you’ll be able to log in and access all
          features.
        </p>
        <a href="/login" className="cta">
          Go to Login
        </a>
      </div>
    </main>
  );
}

export default VerifyEmail;
