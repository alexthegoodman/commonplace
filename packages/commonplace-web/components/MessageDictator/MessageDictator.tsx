import * as React from "react";

import { MessageDictatorProps } from "./MessageDictator.d";

const MessageDictator: React.FC<MessageDictatorProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageDictator"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="messageDictator">
      <div className="messageDictatorInner">
        <div className="dictatorContentWrapper">
          <div className="dictatorContent">
            <span>Here is what I'm typing...</span>
          </div>
        </div>
        <div className="dictatorControls">
          <a className="circleButton">SEND</a>
        </div>
      </div>
    </section>
  );
};

export default MessageDictator;
