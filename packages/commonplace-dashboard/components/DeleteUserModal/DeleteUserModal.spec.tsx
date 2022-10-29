import * as React from "react";
import { render } from "enzyme";

import DeleteUserModal from "./DeleteUserModal";
import TestProvider from "../../modules/client/TestProvider";

describe("DeleteUserModal", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <DeleteUserModal />
      </TestProvider>
    );
  });

  it("", () => {});
});
