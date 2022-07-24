import * as React from "react";
import { render } from "enzyme";

import ImpressionGrid from "./ImpressionGrid";
import TestProvider from "../../modules/client/TestProvider";

describe("ImpressionGrid", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ImpressionGrid />
      </TestProvider>
    );
  });

  it("", () => {});
});
