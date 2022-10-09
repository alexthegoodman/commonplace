import * as React from "react";

import { ManagementNavigationProps } from "./ManagementNavigation.d";

import Link from "next/link";

const ManagementNavigation: React.FC<ManagementNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ManagementNavigation"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <header>
      <Link href="/manage">Manage Posts</Link> |
      <Link href="/manage/users">Manage Users</Link>
    </header>
  );
};

export default ManagementNavigation;
