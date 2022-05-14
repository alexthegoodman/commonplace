import * as React from "react";
import { render } from "enzyme";

import UpdateItem from "./UpdateItem";
import TestProvider from "../../modules/client/TestProvider";

describe("UpdateItem", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <UpdateItem />
      </TestProvider>
    );
  });

  it("", () => {});
});
