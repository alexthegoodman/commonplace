import * as React from "react";
import { render } from "enzyme";

import FormUpload from "./FormUpload";
import TestProvider from "../../modules/client/TestProvider";

describe("FormUpload", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormUpload />
      </TestProvider>
    );
  });

  it("", () => {});
});
