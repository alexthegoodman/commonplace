import * as React from "react";
import { render } from "enzyme";

import MessageDictator from "./MessageDictator";
import TestProvider from "../../modules/client/TestProvider";

describe("MessageDictator", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <TestProvider>
        <MessageDictator />
      </TestProvider>
    );
  });

  it("", () => {});
});
