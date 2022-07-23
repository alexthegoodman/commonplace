import * as React from "react";
import { render } from "enzyme";

import TextViewer from "./TextViewer";
import TestProvider from "../../modules/client/TestProvider";

describe("TextViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <TextViewer />
      </TestProvider>
    );
  });

  it("", () => {});
});
