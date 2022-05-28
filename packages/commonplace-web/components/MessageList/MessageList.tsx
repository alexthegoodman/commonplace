import * as React from "react";
import MessageItem from "../MessageItem/MessageItem";

import { MessageListProps } from "./MessageList.d";

const MessageList: React.FC<MessageListProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageList"),
  currentUser = null,
  otherUser = null,
  messages = [],
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="messageList">
      <div className="messageListInner">
        {messages?.map((message, i) => {
          const isCurrentUser =
            message?.user?.email === currentUser?.user?.email ? true : false;

          return (
            <MessageItem
              message={message}
              authorSide={isCurrentUser ? "right" : "left"}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MessageList;
