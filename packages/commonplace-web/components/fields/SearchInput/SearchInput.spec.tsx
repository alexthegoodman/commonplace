import * as React from "react";
import { render } from "enzyme";

import SearchInput from "./SearchInput";
import TestProvider from "../../modules/client/TestProvider";

describe("SearchInput", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <SearchInput />
      </TestProvider>
    );
  });

  it("", () => {});
});
