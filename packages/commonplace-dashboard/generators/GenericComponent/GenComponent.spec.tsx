import * as React from "react";
import { render } from "enzyme";

import {{ name }} from "./{{ name }}";
import TestProvider from "../../modules/client/TestProvider";

describe("{{ name }}", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <{{ name }} />
      </TestProvider>
    );
  });

  it("", () => {});
});
