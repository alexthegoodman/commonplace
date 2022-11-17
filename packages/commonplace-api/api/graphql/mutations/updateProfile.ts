import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import AWS from "commonplace-utilities/lib/AWS";
import { Context } from "../../context";

export const UpdateProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateProfile", {
      type: "String",
      args: {
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
        { prisma, mixpanel, currentUser }: Context
      ) => {
        const aws = new AWS();

        let upload1Path = "";
        if (profileImageName && profileImageData) {
          upload1Path = (await aws.uploadAsset(
            "image",
            profileImageName,
            profileImageType,
            profileImageSize,
            profileImageData
          )) as string;
        }

        let upload2Path = "";
        if (coverImageName && coverImageData) {
          upload2Path = (await aws.uploadAsset(
            "image", // file2 is always image
            coverImageName,
            coverImageType,
            coverImageSize,
            coverImageData
          )) as string;
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
            id: currentUser.id,
          },
          data: {
            chosenUsername: username,
            ...addtData,
          },
        });

        mixpanel.track("Profile Updated", { updatedUser });

        return updatedUser?.id;
      },
    });
  },
});
