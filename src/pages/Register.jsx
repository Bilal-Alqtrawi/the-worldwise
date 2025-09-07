import { Link, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Register.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { signup } from "../services/apiAuth";
import supabase from "../services/supabase";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    fullName: null,
    email: null,
    password: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userData = Object.fromEntries(formData);

    console.log(userData);

    if (!userData.fullName) {
      setErrors((errors) => ({
        ...errors,
        fullName: "FullName field is required",
      }));
    }
    if (!userData.email) {
      setErrors((errors) => ({
        ...errors,
        email: "Email field is required",
      }));
    }

    if (!userData.password) {
      setErrors((errors) => ({
        ...errors,
        password: "Password field is required",
      }));
    }

    if (!userData.email || !userData.password || !userData.fullName) {
      toast.error("This fields is required", {
        autoClose: 3000,
        pauseOnHover: false,
      });
      return;
    }

    let avatarUrl = "";

    if (userData.avatar && userData.avatar.size > 0) {
      // userData.avatar.name: name of file
      const fileName = `avatar-${Date.now()}-${userData.avatar.name}`;

      const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, userData.avatar);

      if (storageError) {
        toast.error(storageError.message);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      avatarUrl = publicUrl.publicUrl;
    }

    await signup({ ...userData, avatar: avatarUrl });

    toast.success("Account created successfully!");
    navigate("/verify-email");
  }

  return (
    <>
      <PageNav />
      <main className={styles.register}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={(e) => {
                if (e.target.value !== "")
                  setErrors({ ...errors, fullName: null });
              }}
            />
            {errors?.fullName && (
              <p className={styles.error}>{errors.fullName}</p>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            {errors?.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.row}>
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" name="password" />
            {errors?.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="avatar">Avartar Image</label>
            <input type="file" id="avatar" name="avatar" />
          </div>

          <div className={styles["form-actions"]}>
            <button
              type="reset"
              className={`${styles.btn} ${styles["btn-reset"]}`}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles["btn-submit"]}`}
            >
              Send
            </button>
          </div>
          <div className={styles["sign-in-message"]}>
            <span>You have an account ? </span>
            <Link to="/login">Login In</Link>
          </div>
        </form>
      </main>
    </>
  );
}
