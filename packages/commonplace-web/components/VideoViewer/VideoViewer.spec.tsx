import * as React from "react";
import { render } from "enzyme";

import VideoViewer from "./VideoViewer";
import TestProvider from "../../modules/client/TestProvider";

describe("VideoViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <VideoViewer />
      </TestProvider>
    );
  });

  it("", () => {});
});
