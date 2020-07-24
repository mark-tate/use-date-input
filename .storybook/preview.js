import { addParameters } from "@storybook/react";

addParameters({
  options: {
    // Sort stories in numeric order
    storySort: function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
  }
});
