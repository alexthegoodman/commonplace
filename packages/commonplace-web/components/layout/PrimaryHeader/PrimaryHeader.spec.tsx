import * as React from "react";
import { render } from "enzyme";

import PrimaryHeader from "./PrimaryHeader";
import TestProvider from "../../modules/client/TestProvider";

describe("PrimaryHeader", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PrimaryHeader />
      </TestProvider>
    );
  });

  it("", () => {});
});
