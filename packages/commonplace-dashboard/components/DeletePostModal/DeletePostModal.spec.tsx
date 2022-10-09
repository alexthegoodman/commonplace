import * as React from "react";
import { render } from "enzyme";

import DeletePostModal from "./DeletePostModal";
import TestProvider from "../../modules/client/TestProvider";

describe("DeletePostModal", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <DeletePostModal />
      </TestProvider>
    );
  });

  it("", () => {});
});
