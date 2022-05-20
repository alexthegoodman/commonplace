import * as React from "react";
import { render } from "enzyme";

import InterestGrid from "./InterestGrid";
import TestProvider from "../../modules/client/TestProvider";

describe("InterestGrid", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <InterestGrid />
      </TestProvider>
    );
  });

  it("", () => {});
});
