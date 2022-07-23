import * as React from "react";
import { render } from "enzyme";

import AudioViewer from "./AudioViewer";
import TestProvider from "../../modules/client/TestProvider";

describe("AudioViewer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <AudioViewer />
      </TestProvider>
    );
  });

  it("", () => {});
});
