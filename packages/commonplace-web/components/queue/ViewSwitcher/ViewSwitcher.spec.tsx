import * as React from "react";
import { render } from "enzyme";

import ViewSwitcher from "./ViewSwitcher";
import TestProvider from "../../modules/client/TestProvider";

describe("ViewSwitcher", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ViewSwitcher />
      </TestProvider>
    );
  });

  it("", () => {});
});
