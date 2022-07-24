import * as React from "react";
import { render } from "enzyme";

import ImageViewer from "./ImageViewer";
import TestProvider from "../../modules/client/TestProvider";

describe("ImageViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ImageViewer />
      </TestProvider>
    );
  });

  it("", () => {});
});
