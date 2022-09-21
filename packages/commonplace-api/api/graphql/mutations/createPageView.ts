import axios from "axios";
import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const CreatePageViewMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPageView", {
      type: "PageView",
      args: {
        url: nonNull(stringArg()),
      },
      resolve: async (_, { url }, { prisma, mixpanel, req }: Context) => {
        console.info("Create Page View", req.ip, url, req.url, url);
        const ipAddress = req.ip;

        const geoData = await axios.get(
          `http://api.ipstack.com/${ipAddress}?access_key=${process.env.IPSTACK_KEY}`
        );

        console.info("geoData", geoData.data);

        const pageview = prisma.pageView.create({
          data: {
            url,
            ipAddress: ipAddress ? ipAddress : "",
            city: geoData.data.city ? geoData.data.city : "",
            geoData: geoData.data ? JSON.stringify(geoData.data) : "",
          },
        });

        mixpanel.track("Page View");

        console.info("Created pageview", pageview);

        return pageview;
      },
    });
  },
});
