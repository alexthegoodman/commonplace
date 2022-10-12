import * as React from "react";
import { render } from "enzyme";

import ProfileAvatar from "./ProfileAvatar";
import TestProvider from "../../modules/client/TestProvider";

describe("ProfileAvatar", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ProfileAvatar />
      </TestProvider>
    );
  });

  it("", () => {});
});
