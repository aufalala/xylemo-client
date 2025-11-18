import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";

import styles from "./_LoginPage.module.css"

function LoginPage() {
  
  const { login } = useAuth();
  
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login({
        username,
        password,
      });

    } catch (e) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className={styles.loginPageContainer}>
      
      <div className={styles.sloganContainer}>
        WATCH<br/>THE ORDERS<br/>FLOW
      </div>

      <div className={styles.loginFormContainer}>
        <div className={styles.title}>
          xylemo
        </div>
        <div className={styles.loginForm}>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("");
              }}
              placeholder="Username"
              required
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("");
              }}
              placeholder="Password"
              required
            />
            <button 
            type="submit"
            className={styles.submitButton}
            disabled={loading}
            >Login</button>
            
            <div className={styles.error}>
                {error}
            </div>

          </form>

        </div>
      </div>

    </div>
  )
}

export default LoginPage