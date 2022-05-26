import * as React from "react";

import { PrimaryHeaderProps } from "./PrimaryHeader.d";

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PrimaryHeader"),
  leftIcon = null,
  rightIcon = null,
  title = "",
  titleComponent = null,
  inline = false,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <header className={`primaryHeader ${inline ? "inline" : ""} ${className}`}>
      <div className="primaryHeaderInner">
        <div className="headerIcon headerLeftIcon">{leftIcon}</div>
        <div className="headerTitleWrapper">
          {title ? <h1 className="title">{title}</h1> : <></>}
          {titleComponent ? (
            <div className="titleComponent">{titleComponent}</div>
          ) : (
            <></>
          )}
        </div>
        <div className="headerIcon headerRightIcon">{rightIcon}</div>
      </div>
    </header>
  );
};

export default PrimaryHeader;
