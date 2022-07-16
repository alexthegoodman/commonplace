import * as React from "react";
import { render } from "enzyme";

import LandingHeroA from "./LandingHeroA";
import TestProvider from "../../modules/client/TestProvider";

describe("LandingHeroA", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LandingHeroA />
      </TestProvider>
    );
  });

  it("", () => {});
});
