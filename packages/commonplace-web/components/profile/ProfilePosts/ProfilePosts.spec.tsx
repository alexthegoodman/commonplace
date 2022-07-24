import * as React from "react";
import { render } from "enzyme";

import ProfilePosts from "./ProfilePosts";
import TestProvider from "../../modules/client/TestProvider";

describe("ProfilePosts", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ProfilePosts />
      </TestProvider>
    );
  });

  it("", () => {});
});
