import * as React from "react";
import { render } from "enzyme";

import AuthForm from "./AuthForm";
import TestProvider from "../../modules/client/TestProvider";

describe("AuthForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <AuthForm />
      </TestProvider>
    );
  });

  it("", () => {});
});
