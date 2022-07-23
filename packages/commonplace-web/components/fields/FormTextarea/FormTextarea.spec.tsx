import * as React from "react";
import { render } from "enzyme";

import FormTextarea from "./FormTextarea";
import TestProvider from "../../modules/client/TestProvider";

describe("FormTextarea", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormTextarea />
      </TestProvider>
    );
  });

  it("", () => {});
});
