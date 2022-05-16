import * as React from "react";
import { render } from "enzyme";

import SignInForm from "./SignInForm";
import TestProvider from "../../modules/client/TestProvider";

describe("SignInForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <SignInForm />
      </TestProvider>
    );
  });

  it("", () => {});
});
