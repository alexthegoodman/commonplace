import request from "graphql-request";
import * as React from "react";
import { useForm } from "react-hook-form";
import { createMessageMutation } from "../../graphql/mutations/message";
import FormInput from "../FormInput/FormInput";
import FormTextarea from "../FormTextarea/FormTextarea";

import { MessageDictatorProps } from "./MessageDictator.d";

const MessageDictator: React.FC<MessageDictatorProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageDictator"),
  author = null,
  threadId = "",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("MessageDictator onSubmit", data);

    const message = await request(
      "http://localhost:4000/graphql",
      createMessageMutation,
      {
        type: "reply",
        content: data?.message,
        authorEmail: author?.user?.email,
        threadId: threadId,
      }
    );

    console.info("message", message);
  };
  const onError = (error) => console.error(error);

  return (
    <section className="messageDictator">
      <div className="messageDictatorInner">
        <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="dictatorContentWrapper">
            <div className="dictatorContent">
              <FormTextarea
                name="message"
                placeholder="Type your reply here..."
                register={register}
                errors={errors}
                validation={{ required: true }}
              />
            </div>
          </div>
          <div className="dictatorControls">
            <button className="circleButton" type="submit">
              <div className="feather-icon icon-send"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MessageDictator;
