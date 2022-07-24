import * as React from "react";
import { render } from "enzyme";

import InterestPreview from "./InterestPreview";
import TestProvider from "../../modules/client/TestProvider";

describe("InterestPreview", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <InterestPreview />
      </TestProvider>
    );
  });

  it("", () => {});
});
