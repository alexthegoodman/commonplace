import * as React from "react";
import { storiesOf } from "@storybook/react";
import LandingFeaturesA from "./LandingFeaturesA";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("LandingFeaturesA", () => (
  <TestProvider>
    <LandingFeaturesA />
  </TestProvider>
));
