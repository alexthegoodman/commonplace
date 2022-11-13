import * as React from "react";
import { render } from "enzyme";

import ProfileLink from "./ProfileLink";
import TestProvider from "../../modules/client/TestProvider";

describe("ProfileLink", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ProfileLink />
      </TestProvider>
    );
  });

  it("", () => {});
});
