import React from "react";
import styles from "./Tagline.module.css";

function Tagline() {
  return (
    <div className={styles.tagline}>
      <h1>
        <span>WATCH</span> <br />
        THE ORDERS <br />
        FLOW
      </h1>
    </div>
  );
}

export { Tagline };
