import type { NextPage } from "next";
import Link from "next/link";
import PrimaryHeader from "../components/PrimaryHeader/PrimaryHeader";

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
      </div>
    </section>
  );
};

export default Updates;
