import { useRouter } from "next/router";
import * as React from "react";

// TODO: set ESLint ignore for `next build` type check
import { UpdateItemProps } from "./UpdateItem.d";

const UpdateItem: React.FC<UpdateItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click UpdateItem"),
  id = "",
  image = null,
  label = "",
  author = null,
  isRead = false,
}) => {
  const router = useRouter();
  const goToThead = (e) => {
    onClick(e);

    router.push(`/updates/${id}`);
  };

  return (
    <div className="updateItem" onClick={goToThead}>
      <div className="updateItemInner">
        <div className="itemImageWrapper">
          <img src={author?.profileImage} />
        </div>
        <div className="itemInformation">
          <span className="itemLabel">{label}</span>
          {author !== null ? (
            <span className="itemAttribution">by {author?.chosenUsername}</span>
          ) : (
            <></>
          )}
          {isRead ? (
            <div className="itemColor colorGrey"></div>
          ) : (
            <div className="itemColor colorRed"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
