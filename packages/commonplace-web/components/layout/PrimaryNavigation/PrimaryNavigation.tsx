import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { PrimaryNavigationProps } from "./PrimaryNavigation.d";

const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click PrimaryNavigation"),
  threadCount = 0,
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];

  return (
    <nav
      className={`primaryNavigation ${className}`}
      aria-label="Primary Navigation"
    >
      <div className="primaryNavigationInner">
        <Link href="/upload">
          <a
            className={`navOption primaryNavOption ${
              basePath === "upload" ? "current" : ""
            }`}
            aria-label="Upload"
            tabIndex={1}
          >
            {/* <div className="feather-icon icon-upload"></div> */}
            <i className="typcn typcn-plus"></i>
            <span className="navLabel desktopOnly">Upload</span>
          </a>
        </Link>
        <div className="desktopOnly">
          <Link href="/queue">
            <a
              className={`navOption ${basePath === "queue" ? "current" : ""}`}
              aria-label="Upload"
              tabIndex={1}
            >
              {/* <div className="feather-icon icon-upload"></div> */}
              <i className="typcn typcn-equals"></i>
              <span className="navLabel desktopOnly">Queue</span>
            </a>
          </Link>
        </div>
        <Link href="/profile">
          <a
            className={`navOption ${basePath === "profile" ? "current" : ""}`}
            aria-label="Profile"
            tabIndex={2}
          >
            {/* <div className="feather-icon icon-user"></div> */}
            <i className="typcn typcn-user-outline"></i>
            <span className="navLabel desktopOnly">Profile</span>
          </a>
        </Link>
        <Link href="/updates">
          <a
            className={`navOption ${basePath === "updates" ? "current" : ""}`}
            aria-label="Updates"
            tabIndex={3}
          >
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
        <div className="desktopOnly">
          <Link href="/settings">
            <a
              className={`navOption ${
                basePath === "settings" ? "current" : ""
              }`}
              aria-label="Profile"
              tabIndex={2}
            >
              {/* <div className="feather-icon icon-user"></div> */}
              <i className="typcn typcn-cog"></i>
              <span className="navLabel desktopOnly">Settings</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNavigation;
