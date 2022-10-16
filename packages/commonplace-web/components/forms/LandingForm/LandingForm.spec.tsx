import * as React from "react";
import { render } from "enzyme";

import LandingForm from "./LandingForm";
import TestProvider from "../../modules/client/TestProvider";

describe("LandingForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LandingForm />
      </TestProvider>
    );
  });

  it("", () => {});
});
