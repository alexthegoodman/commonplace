import * as React from "react";
import { render } from "enzyme";

import PostImpressions from "./PostImpressions";
import TestProvider from "../../modules/client/TestProvider";

describe("PostImpressions", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PostImpressions />
      </TestProvider>
    );
  });

  it("", () => {});
});
