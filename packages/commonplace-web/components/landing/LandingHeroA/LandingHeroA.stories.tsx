import * as React from "react";
import { storiesOf } from "@storybook/react";
import LandingHeroA from "./LandingHeroA";
import TestProvider from "../../modules/client/TestProvider";

const stories = storiesOf("UI Components", module);

stories.add("LandingHeroA", () => (
  <TestProvider>
    <LandingHeroA />
  </TestProvider>
));
