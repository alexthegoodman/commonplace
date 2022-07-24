import * as React from "react";

import { PopupModalProps } from "./PopupModal.d";

const PopupModal: React.FC<PopupModalProps> = ({
  ref = null,
  className = "",
  title = null,
  description = null,
  onCancel = () => console.info("Cancel PopupModal"),
  controls = <></>,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <section className="popupModal">
      <div className="popupModalInner">
        <div className="modalHeader">
          <div className="headerInformation">
            <h1 className="headerTitle">{title}</h1>
          </div>
          <div className="headerControls">
            <button className="closeModal" onClick={onCancel}>
              <i className="mu mu-cancel"></i>
            </button>
          </div>
        </div>
        <div className="modalBody">{description}</div>
        <div className="modalControls">{controls}</div>
      </div>
    </section>
  );
};

export default PopupModal;
