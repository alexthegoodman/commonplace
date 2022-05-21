import Link from "next/link";
import * as React from "react";

import { PrimaryNavigationProps } from "./PrimaryNavigation.d";

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PrimaryNavigation"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <nav className="primaryNavigation">
      <div className="primaryNavigationInner">
        <Link href="/upload">
          <a className="navOption primaryNavOption">
            <div className="feather-icon icon-upload"></div>
          </a>
        </Link>
        <Link href="/profile">
          <a className="navOption">
            <div className="feather-icon icon-user"></div>
          </a>
        </Link>
        <Link href="/updates">
          <a className="navOption">
            <div className="feather-icon icon-message-square"></div>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default PrimaryNavigation;
