import * as React from "react";
import { render } from "enzyme";

import MessageItem from "./MessageItem";
import TestProvider from "../../modules/client/TestProvider";

describe("MessageItem", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <MessageItem />
      </TestProvider>
    );
  });

  it("", () => {});
});
