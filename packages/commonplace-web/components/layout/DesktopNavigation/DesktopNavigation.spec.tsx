import * as React from "react";
import { render } from "enzyme";

import DesktopNavigation from "./DesktopNavigation";
import TestProvider from "../../modules/client/TestProvider";

describe("DesktopNavigation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <DesktopNavigation />
      </TestProvider>
    );
  });

  it("", () => {});
});
