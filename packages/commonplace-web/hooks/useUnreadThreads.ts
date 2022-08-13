import React, { useState, useEffect, createContext } from "react";

export const useUnreadThreads = (threads = [], currentUsername) => {
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {});

  const unreadThreads = [] as any[];

  threads?.forEach((thread: any, i) => {
    let lastMessage = thread.messages.filter(
      (message, i) => message?.user?.generatedUsername !== currentUsername
    );
    lastMessage = lastMessage[0];

    let lastReadRecord = thread.readHistory.filter(
      (record, i) => record.content === currentUsername
    );
    lastReadRecord = lastReadRecord[lastReadRecord.length - 1];

    // console.info(
    //   "lastReadRecord",
    //   i,
    //   currentUsername,
    //   lastMessage,
    //   lastReadRecord
    // );

    if (
      typeof lastMessage !== "undefined" &&
      typeof lastReadRecord !== "undefined"
    ) {
      // CASE: some messages and read records,
      // but message from other user is newer than read records
      const lastMessageTime = lastMessage.createdAt;
      const lastReadTime = lastReadRecord.createdAt;

      if (lastReadTime < lastMessageTime) {
        unreadThreads.push(thread);
      }
    } else if (
      typeof lastMessage !== "undefined" &&
      typeof lastReadRecord === "undefined"
    ) {
      // CASE: some messages, no read records (rare?)
      unreadThreads.push(thread);
    } else if (
      thread.messages.length === 1 &&
      typeof lastReadRecord === "undefined"
    ) {
      // CASE: 1 message from other user, no read records
      unreadThreads.push(thread);
    }
  });

  const unreadThreadCount = unreadThreads.length;

  return {
    unreadThreads,
    unreadThreadCount,
  };
};
