import * as React from "react";
import { render } from "enzyme";

import CreditCounter from "./CreditCounter";
import TestProvider from "../../modules/client/TestProvider";

describe("CreditCounter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <CreditCounter />
      </TestProvider>
    );
  });

  it("", () => {});
});
