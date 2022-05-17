import type { NextPage } from "next";
import Link from "next/link";
import MessageDictator from "../components/MessageDictator/MessageDictator";
import MessageList from "../components/MessageList/MessageList";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

const Thread: NextPage = () => {
  return (
    <section className="thread">
      <div className="threadInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/updates">
              <a>U</a>
            </Link>
          }
          title="Chat with Grace"
          rightIcon={<></>}
        />
        <MessageList />
        <MessageDictator />
      </div>
    </section>
  );
};

export default Thread;
