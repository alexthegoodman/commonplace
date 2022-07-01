const Mixpanel = require("mixpanel");

export const setupMixpanel = () => {
  console.info("Setup Mixpanel...");

  const isDevelopment = process.env.NODE_ENV === "development";

  const mixpanel = Mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", {
    debug: isDevelopment,
  });

  // if (isDevelopment) {
  //   mixpanel.opt_out_tracking();
  // } else {
  //   mixpanel.opt_in_tracking();
  // }

  return mixpanel;
};
