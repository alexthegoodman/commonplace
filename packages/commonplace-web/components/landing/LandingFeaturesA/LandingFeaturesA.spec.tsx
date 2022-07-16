import * as React from "react";
import { render } from "enzyme";

import LandingFeaturesA from "./LandingFeaturesA";
import TestProvider from "../../modules/client/TestProvider";

describe("LandingFeaturesA", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LandingFeaturesA />
      </TestProvider>
    );
  });

  it("", () => {});
});
