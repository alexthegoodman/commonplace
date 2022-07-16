import * as React from "react";
import { storiesOf } from "@storybook/react";
import LandingBlockA from "./LandingBlockA";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("LandingBlockA", () => (
  <TestProvider>
    <LandingBlockA />
  </TestProvider>
));
