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
  const [detailItem, setDetailItem] = React.useState(null);

  const onMessageClick = (id) => {
    if (id === detailItem) {
      setDetailItem(null);
    } else {
      setDetailItem(id);
    }
  };

  return (
    <section className="messageList">
      <div
        className="messageListInner"
        role="list"
        tabIndex={0}
        aria-label="Message List"
      >
        {messages?.map((message, i) => {
          const isCurrentUser =
            message?.user?.generatedUsername ===
            currentUser?.getUser?.generatedUsername
              ? true
              : false;

          console.info("message", message);

          return (
            <MessageItem
              onClick={() => onMessageClick(message?.id)}
              chosenUsername={message?.user?.chosenUsername}
              message={message}
              authorSide={isCurrentUser ? "right" : "left"}
              detailsOpen={detailItem === message.id ? true : false}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MessageList;
