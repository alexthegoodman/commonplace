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
      resolve: async (
        _,
        { url },
        { prisma, mixpanel, req, currentUser }: Context
      ) => {
        console.info(
          "Create Page View",
          req.ip,
          req.headers["x-forwarded-for"],
          req.socket.remoteAddress
        );
        const ipAddress = req.ip;

        // const geoData = await axios.get(
        //   `http://api.ipstack.com/${ipAddress}?access_key=${process.env.IPSTACK_KEY}`
        // );

        // console.info("geoData", geoData.data);

        let addtData = {};

        if (typeof currentUser !== "undefined" && currentUser) {
          addtData = {
            user: {
              connect: {
                id: currentUser.id,
              },
            },
          };
        }

        const pageview = prisma.pageView.create({
          data: {
            url,
            ipAddress: ipAddress ? ipAddress : "",
            city: "",
            geoData: "",
            ...addtData,
            // city: geoData.data.city ? geoData.data.city : "",
            // geoData: geoData.data ? JSON.stringify(geoData.data) : "",
          },
        });

        mixpanel.track("Page View", { url, ipAddress, currentUser });

        console.info("Created pageview", pageview);

        return pageview;
      },
    });
  },
});
