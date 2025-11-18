import { useEffect, useState } from "react";
import { useChatFeed } from "../contexts/ChatFeedContext.jsx";

import styles from "./_TestChatFeed.module.css"

function TestChatFeed() {
  const { todaysMessages } = useChatFeed();

  return (
    <div>
      <h2>Live Chat Feed</h2>
      {todaysMessages && todaysMessages.length > 0 && todaysMessages.map((msg) => (
        <div
          key={msg._id}
          className={`${msg.isOrder ? styles.isOrder : ""} ${msg.isFailedOrder ? styles.isFailedOrder : ""} ${msg.isHighlight ? styles.highlight : ""}`}
        >
          <strong>{msg.username}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default TestChatFeed;
