import * as React from "react";
import { render } from "enzyme";

import FormInput from "./FormInput";
import TestProvider from "../../modules/client/TestProvider";

describe("FormInput", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormInput />
      </TestProvider>
    );
  });

  it("", () => {});
});
