import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { login } from "../services/apiAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email)
      setErrors((errors) => ({
        ...errors,
        email: "Email field is required",
      }));
    if (!password)
      setErrors((errors) => ({
        ...errors,
        password: "Password field is required",
      }));

    if (!email || !password) {
      toast.error("You should input required field");
      return;
    }

    setErrors({});
    // toast.success("Success Addded");
    try {
      const { user, session } = await login({ email, password });
      toast.success("Login successful");

      console.log("Logged in user:", user, session);

      navigate("/app");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <PageNav />
      <main className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.length > 0)
                  setErrors((errors) => ({ ...errors, email: null }));
              }}
              value={email}
              className={errors?.email ? styles.error : styles.inp}
            />
            {errors?.email !== null && <span>{errors.email}</span>}
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length > 0)
                  setErrors((errors) => ({ ...errors, password: null }));
              }}
              value={password}
              className={errors?.email ? styles.error : styles.inp}
            />
            {errors?.password !== null && <span>{errors.password}</span>}
          </div>

          <div>
            <Button type="primary">Login</Button>
          </div>

          <div className={styles["sign-up-message"]}>
            <span>You don&apos;t have account ? </span>
            <Link to="/register">Sign In</Link>
          </div>
        </form>
      </main>
    </>
  );
}
