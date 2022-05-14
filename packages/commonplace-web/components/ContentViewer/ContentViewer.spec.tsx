import * as React from "react";
import { render } from "enzyme";

import ContentViewer from "./ContentViewer";
import TestProvider from "../../modules/client/TestProvider";

describe("ContentViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ContentViewer />
      </TestProvider>
    );
  });

  it("", () => {});
});
