import * as React from "react";
import { render } from "enzyme";

import PostInteraction from "./PostInteraction";
import TestProvider from "../../modules/client/TestProvider";

describe("PostInteraction", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PostInteraction />
      </TestProvider>
    );
  });

  it("", () => {});
});
