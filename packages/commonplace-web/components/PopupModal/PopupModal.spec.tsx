import * as React from "react";
import { render } from "enzyme";

import PopupModal from "./PopupModal";
import TestProvider from "../../modules/client/TestProvider";

describe("PopupModal", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PopupModal />
      </TestProvider>
    );
  });

  it("", () => {});
});
