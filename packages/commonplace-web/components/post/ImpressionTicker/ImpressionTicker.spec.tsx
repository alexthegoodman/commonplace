import * as React from "react";
import { render } from "enzyme";

import ImpressionTicker from "./ImpressionTicker";
import TestProvider from "../../modules/client/TestProvider";

describe("ImpressionTicker", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ImpressionTicker />
      </TestProvider>
    );
  });

  it("", () => {});
});
