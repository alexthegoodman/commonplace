import * as React from "react";
import { render } from "enzyme";

import LandingBlockA from "./LandingBlockA";
import TestProvider from "../../modules/client/TestProvider";

describe("LandingBlockA", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LandingBlockA />
      </TestProvider>
    );
  });

  it("", () => {});
});
