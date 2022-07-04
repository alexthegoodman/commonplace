import * as React from "react";
import { render } from "enzyme";

import LineViz from "./LineViz";
import TestProvider from "../../modules/client/TestProvider";

describe("LineViz", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LineViz />
      </TestProvider>
    );
  });

  it("", () => {});
});
