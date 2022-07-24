import * as React from "react";
import { render } from "enzyme";

import FormMessage from "./FormMessage";
import TestProvider from "../../modules/client/TestProvider";

describe("FormMessage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <FormMessage />
      </TestProvider>
    );
  });

  it("", () => {});
});
