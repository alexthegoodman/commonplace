import * as React from "react";
import { render } from "enzyme";

import ProfilePost from "./ProfilePost";
import TestProvider from "../../modules/client/TestProvider";

describe("ProfilePost", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ProfilePost />
      </TestProvider>
    );
  });

  it("", () => {});
});
