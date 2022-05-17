import * as React from "react";
import { render } from "enzyme";

import ProfileIntro from "./ProfileIntro";
import TestProvider from "../../modules/client/TestProvider";

describe("ProfileIntro", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <ProfileIntro />
      </TestProvider>
    );
  });

  it("", () => {});
});
