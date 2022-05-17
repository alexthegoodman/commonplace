import * as React from "react";
import { render } from "enzyme";

import MessageList from "./MessageList";
import TestProvider from "../../modules/client/TestProvider";

describe("MessageList", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <MessageList />
      </TestProvider>
    );
  });

  it("", () => {});
});
