import * as React from "react";
import { render } from "enzyme";

import InviteFriends from "./InviteFriends";
import TestProvider from "../../modules/client/TestProvider";

describe("InviteFriends", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <InviteFriends />
      </TestProvider>
    );
  });

  it("", () => {});
});
