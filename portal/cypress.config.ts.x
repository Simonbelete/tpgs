import { defineConfig } from "cypress";

import siteMetadata from "./data/siteMetadata";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: siteMetadata.siteUrl,
  },
});
