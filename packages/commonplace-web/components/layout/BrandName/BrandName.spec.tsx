import * as React from "react";
import { render } from "enzyme";

import BrandName from "./BrandName";
import TestProvider from "../../modules/client/TestProvider";

describe("BrandName", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <BrandName />
      </TestProvider>
    );
  });

  it("", () => {});
});
