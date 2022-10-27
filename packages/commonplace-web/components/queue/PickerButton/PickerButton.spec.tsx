import * as React from "react";
import { render } from "enzyme";

import PickerButton from "./PickerButton";
import TestProvider from "../../modules/client/TestProvider";

describe("PickerButton", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <PickerButton />
      </TestProvider>
    );
  });

  it("", () => {});
});
