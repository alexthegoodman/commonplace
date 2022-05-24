import * as React from "react";
import { render } from "enzyme";

import StepCounter from "./StepCounter";
import TestProvider from "../../modules/client/TestProvider";

describe("StepCounter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <StepCounter />
      </TestProvider>
    );
  });

  it("", () => {});
});
