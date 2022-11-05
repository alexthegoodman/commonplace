import request from "graphql-request";
import { useTranslation } from "next-i18next";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { GQLClient } from "commonplace-utilities/lib/GQLClient";
import { createReplyMutation } from "../../../graphql/mutations/message";
import FormTextarea from "../../fields/FormTextarea/FormTextarea";

import { MessageDictatorProps } from "./MessageDictator.d";

const MessageDictator: React.FC<MessageDictatorProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click MessageDictator"),
  author = null,
  threadId = "",
}) => {
  const { t } = useTranslation();
  const [cookies] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const gqlClient = new GQLClient(token);

  // const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("MessageDictator onSubmit", data, threadId);

    const message = await gqlClient.client.request(createReplyMutation, {
      content: data?.message,
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
                placeholder={t("updates:typeReply")}
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
