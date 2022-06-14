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
            <span className="navLabel desktopOnly">Upload</span>
            {/* <div className="feather-icon icon-upload"></div> */}
            <i className="typcn typcn-plus"></i>
          </a>
        </Link>
        <Link href="/profile">
          <a className="navOption" aria-label="Profile">
            <span className="navLabel desktopOnly">Profile</span>
            {/* <div className="feather-icon icon-user"></div> */}
            <i className="typcn typcn-user-outline"></i>
          </a>
        </Link>
        <Link href="/updates">
          <a className="navOption" aria-label="Updates">
            <span className="navLabel desktopOnly">Updates</span>
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
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default PrimaryNavigation;
