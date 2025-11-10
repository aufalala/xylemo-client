import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const { login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    login(username, password);
  };

  if (user) {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <h1>Welcome, {user.username}!</h1>
          <p>You are now logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.tagline}>
          <h1>
            <span>WATCH</span> <br />
            THE ORDERS <br />
            FLOW
          </h1>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.logo}>xylemo</h1>
        

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;