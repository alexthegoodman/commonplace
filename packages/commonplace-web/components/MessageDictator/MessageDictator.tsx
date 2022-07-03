import request from "graphql-request";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { cpGraphqlUrl } from "../../def/urls";
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

  // const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("MessageDictator onSubmit", data);

    const message = await request(cpGraphqlUrl, createMessageMutation, {
      type: "reply",
      content: data?.message,
      authorEmail: author?.user?.email,
      threadId: threadId,
    });

    // mutate(cpGraphqlUrl);

    reset();

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
                aria-label="Dictate Message"
              />
            </div>
          </div>
          <div className="dictatorControls">
            <button
              className="circleButton"
              type="submit"
              aria-label="Send Message"
            >
              <div className="typcn typcn-chevron-right"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MessageDictator;
