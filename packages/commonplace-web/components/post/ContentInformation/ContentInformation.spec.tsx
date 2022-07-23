import * as React from "react";
import { render } from "enzyme";

import ContentInformation from "./ContentInformation";
import TestProvider from "../../modules/client/TestProvider";

describe("ContentInformation", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ContentInformation />
      </TestProvider>
    );
  });

  it("", () => {});
});
