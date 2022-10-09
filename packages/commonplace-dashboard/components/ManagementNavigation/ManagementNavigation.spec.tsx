import * as React from "react";
import { render } from "enzyme";

import ManagementNavigation from "./ManagementNavigation";
import TestProvider from "../../modules/client/TestProvider";

describe("ManagementNavigation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ManagementNavigation />
      </TestProvider>
    );
  });

  it("", () => {});
});
