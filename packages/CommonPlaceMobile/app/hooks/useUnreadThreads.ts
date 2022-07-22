import React, { useState, useEffect, createContext } from "react";

export const useUnreadThreads = (threads = [], currentUsername) => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  const unreadThreads = [] as any[];

  threads?.forEach((thread: any, i) => {
    let lastMessage = thread.messages.filter(
      (message, i) => message?.user?.chosenUsername !== currentUsername
    );
    lastMessage = lastMessage[0];

    let lastReadRecord = thread.readHistory.filter(
      (record, i) => record.content === currentUsername
    );
    lastReadRecord = lastReadRecord[lastReadRecord.length - 1];

    // console.info("lastReadRecord", i, lastMessage, lastReadRecord);

    if (
      typeof lastMessage !== "undefined" &&
      typeof lastReadRecord !== "undefined"
    ) {
      const lastMessageTime = lastMessage.createdAt;
      const lastReadTime = lastReadRecord.createdAt;

      // console.info("compare times", i, lastReadTime, lastMessageTime);

      let isRead = true;
      if (lastReadTime < lastMessageTime) {
        isRead = false;
        unreadThreads.push(thread);
      }
    } else if (
      typeof lastMessage !== "undefined" &&
      typeof lastReadRecord === "undefined"
    ) {
      unreadThreads.push(thread);
    } else if (
      thread.messages.length === 1 &&
      typeof lastReadRecord === "undefined"
    ) {
      // NOTE: brand new convresation
      unreadThreads.push(thread);
    }
  });

  const unreadThreadCount = unreadThreads.length;

  return {
    unreadThreads,
    unreadThreadCount,
  };
};
