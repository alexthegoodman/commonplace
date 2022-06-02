import * as React from "react";
import { render } from "enzyme";

import SimpleErrorMessage from "./SimpleErrorMessage";
import TestProvider from "../../modules/client/TestProvider";

describe("SimpleErrorMessage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <SimpleErrorMessage />
      </TestProvider>
    );
  });

  it("", () => {});
});
