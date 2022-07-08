import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import Utilities from "../../../../commonplace-utilities";
import { Context } from "../../context";

export const UpdateProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateProfile", {
      type: "String",
      args: {
        userId: nonNull(stringArg()),
        username: nonNull(stringArg()),

        profileImageName: nullable(stringArg()),
        profileImageSize: nullable(intArg()),
        profileImageType: nullable(stringArg()),
        profileImageData: nullable(stringArg()),

        coverImageName: nullable(stringArg()),
        coverImageSize: nullable(intArg()),
        coverImageType: nullable(stringArg()),
        coverImageData: nullable(stringArg()),
      },
      resolve: async (
        _,
        {
          userId,
          username,
          profileImageName,
          profileImageSize,
          profileImageType,
          profileImageData,
          coverImageName,
          coverImageSize,
          coverImageType,
          coverImageData,
        },
        { prisma, mixpanel }: Context
      ) => {
        const utilities = new Utilities();

        let upload1Path = "";
        if (profileImageName && profileImageData) {
          upload1Path = await utilities.AWS.uploadAsset(
            "image",
            profileImageName,
            profileImageType,
            profileImageSize,
            profileImageData
          );
        }

        let upload2Path = "";
        if (coverImageName && coverImageData) {
          upload2Path = await utilities.AWS.uploadAsset(
            "image", // file2 is always image
            coverImageName,
            coverImageType,
            coverImageSize,
            coverImageData
          );
        }

        let addtData = {};
        if (upload1Path !== "") {
          addtData = {
            ...addtData,
            profileImage: upload1Path,
          };
        }

        if (upload2Path !== "") {
          addtData = {
            ...addtData,
            coverImage: upload2Path,
          };
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            chosenUsername: username,
            ...addtData,
          },
        });

        return updatedUser?.id;
      },
    });
  },
});
