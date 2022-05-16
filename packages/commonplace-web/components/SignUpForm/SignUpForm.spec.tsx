import * as React from "react";
import { render } from "enzyme";

import SignUpForm from "./SignUpForm";
import TestProvider from "../../modules/client/TestProvider";

describe("SignUpForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <SignUpForm />
      </TestProvider>
    );
  });

  it("", () => {});
});
