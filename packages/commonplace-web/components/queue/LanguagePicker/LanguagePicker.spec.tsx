import * as React from "react";
import { render } from "enzyme";

import LanguagePicker from "./LanguagePicker";
import TestProvider from "../../modules/client/TestProvider";

describe("LanguagePicker", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <LanguagePicker />
      </TestProvider>
    );
  });

  it("", () => {});
});
