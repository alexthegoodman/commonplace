import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
