import * as React from "react";
import { render } from "enzyme";

import BarViz from "./BarViz";
import TestProvider from "../../modules/client/TestProvider";

describe("BarViz", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <BarViz />
      </TestProvider>
    );
  });

  it("", () => {});
});
