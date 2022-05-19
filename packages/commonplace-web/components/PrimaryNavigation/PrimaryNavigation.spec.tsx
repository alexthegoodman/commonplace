import * as React from "react";
import { render } from "enzyme";

import PrimaryNavigation from "./PrimaryNavigation";
import TestProvider from "../../modules/client/TestProvider";

describe("PrimaryNavigation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PrimaryNavigation />
      </TestProvider>
    );
  });

  it("", () => {});
});
