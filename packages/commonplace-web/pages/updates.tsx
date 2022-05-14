import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";
import UpdateItem from "../components/UpdateItem/UpdateItem";

const Updates: NextPage = () => {
  return (
    <section className="updates">
      <div className="updatesInner">
        <PrimaryHeader
          leftIcon={
            <Link href="/">
              <a>Q</a>
            </Link>
          }
          title="Updates"
          rightIcon={<></>}
        />
        <div className="scrollContainer updatesContainer">
          <UpdateItem label="Hard-Hitting!" author={{ name: "CJ" }} />
          <UpdateItem
            label="Just now getting back..."
            author={{ name: "Beth White" }}
          />
          <UpdateItem label="Brilliant!" author={{ name: "Big Gigantic" }} />
          <UpdateItem label="Okay, sure. When?" author={{ name: "Kasbo" }} />
        </div>
      </div>
    </section>
  );
};

export default Updates;
