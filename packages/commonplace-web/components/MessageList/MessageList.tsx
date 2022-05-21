import * as React from "react";
import MessageItem from "../MessageItem/MessageItem";

import { MessageListProps } from "./MessageList.d";

const MessageList: React.FC<MessageListProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageList"),
  messages = [],
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="messageList">
      <div className="messageListInner">
        {messages?.map((message, i) => {
          const isCurrentUser =
            message?.user?.email === "alexthegoodman@gmail.com" ? true : false;

          return (
            <MessageItem
              authorSide={isCurrentUser ? "right" : "left"}
              profileImage={message?.user?.profileImage}
              content={message?.content}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MessageList;
