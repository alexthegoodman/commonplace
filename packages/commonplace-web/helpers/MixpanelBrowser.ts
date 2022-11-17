import mixpanel from "mixpanel-browser";

export default class MixpanelBrowser {
  public isDevelopment;

  constructor() {
    this.isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === "development";

    mixpanel.init("0257a00f77cd9b500e88e34f96b2e991", {
      debug: this.isDevelopment,
    });

    // if (isDevelopment) {
    //   mixpanel.opt_out_tracking();
    // } else {
    //   mixpanel.opt_in_tracking();
    // }
  }

  track(name: string, data?: any) {
    const sendName = this.isDevelopment ? "DEV - " + name : name;

    mixpanel.track(sendName, {
      ...data,
      isDevelopment: this.isDevelopment,
    });
  }
}
