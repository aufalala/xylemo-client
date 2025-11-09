import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./PromoterHome.module.css";

function PromoterHome() {
  const { user, logout } = useAuth();
  
  // Session states - change to true to show green indicator
  const [instagramLive, setInstagramLive] = useState(false);
  const [tiktokLive, setTiktokLive] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}>XP</div>
          <span className={styles.logoText}>xylemo</span>
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.liveIndicators}>
            <div className={styles.liveItem}>
              <span className={styles.platformName}>Instagram</span>
              <div className={`${styles.indicator} ${instagramLive ? styles.live : styles.offline}`}></div>
            </div>
            <div className={styles.liveItem}>
              <span className={styles.platformName}>TikTok</span>
              <div className={`${styles.indicator} ${tiktokLive ? styles.live : styles.offline}`}></div>
            </div>
          </div>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <h1 className={styles.title}>Promoter Home</h1>
        
        <div className={styles.grid}>
          {/* Instagram Chat */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Instagram Chat</h2>
            </div>
            <div className={styles.cardContent}>
              <p>No active chats</p>
            </div>
          </div>

          {/* Today's Orders */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Today's Orders</h2>
            </div>
            <div className={styles.cardContent}>
              <p>No orders today</p>
            </div>
          </div>

          {/* TikTok Chat */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>TikTok Chat</h2>
            </div>
            <div className={styles.cardContent}>
              <p>No active chats</p>
            </div>
          </div>

          {/* Active Products */}
          <div className={`${styles.card} ${styles.wideCard}`}>
            <div className={styles.cardHeader}>
              <h2>Active Products</h2>
            </div>
            <div className={styles.cardContent}>
              <p>No active products</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PromoterHome;