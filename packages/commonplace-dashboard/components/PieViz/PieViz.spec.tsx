import * as React from "react";
import { render } from "enzyme";

import PieViz from "./PieViz";
import TestProvider from "../../modules/client/TestProvider";

describe("PieViz", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PieViz />
      </TestProvider>
    );
  });

  it("", () => {});
});
