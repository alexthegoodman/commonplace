import * as React from "react";

import { ManagementNavigationProps } from "./ManagementNavigation.d";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const ManagementNavigation: React.FC<ManagementNavigationProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click ManagementNavigation"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <Link href="/manage">Manage Posts</Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link href="/manage/users">Manage Users</Link>
        </NavigationMenu.Item>

        {/* <NavigationMenu.Item>
          <NavigationMenu.Trigger />
          <NavigationMenu.Content>
            <NavigationMenu.Sub>
              <NavigationMenu.List />
              <NavigationMenu.Viewport />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator /> */}
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};

export default ManagementNavigation;
