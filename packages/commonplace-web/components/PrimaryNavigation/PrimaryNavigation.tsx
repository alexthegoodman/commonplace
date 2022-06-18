import Link from "next/link";
import * as React from "react";

import { PrimaryNavigationProps } from "./PrimaryNavigation.d";

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PrimaryNavigation"),
  threadCount = 0,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <nav className="primaryNavigation" aria-label="Primary Navigation">
      <div className="primaryNavigationInner">
        <Link href="/upload">
          <a className="navOption primaryNavOption" aria-label="Upload">
            {/* <div className="feather-icon icon-upload"></div> */}
            <i className="typcn typcn-plus"></i>
            <span className="navLabel desktopOnly">Upload</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className="navOption" aria-label="Profile">
            {/* <div className="feather-icon icon-user"></div> */}
            <i className="typcn typcn-user-outline"></i>
            <span className="navLabel desktopOnly">Profile</span>
          </a>
        </Link>
        <Link href="/updates">
          <a className="navOption" aria-label="Updates">
            {/* <div className="feather-icon icon-message-square"></div> */}
            {threadCount > 0 ? (
              <span
                className="navIndicator"
                aria-label={`${threadCount} Updates`}
              >
                {threadCount}
              </span>
            ) : (
              <></>
            )}
            <i className="typcn typcn-messages"></i>
            <span className="navLabel desktopOnly">Updates</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default PrimaryNavigation;
