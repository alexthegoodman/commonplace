import * as React from "react";

// TODO: set ESLint ignore for `next build` type check
import { UpdateItemProps } from "./UpdateItem.d";

const UpdateItem: React.FC<UpdateItemProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click UpdateItem"),
  image = null,
  label = "",
  author = null,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <div className="updateItem">
      <div className="updateItemInner">
        <img src={image} />
        <div className="itemInformation">
          <span className="itemLabel">{label}</span>
          {author !== null ? (
            <span className="itemAttribution">by {author.name}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
