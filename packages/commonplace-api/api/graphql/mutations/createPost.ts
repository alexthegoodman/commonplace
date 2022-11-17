import { nanoid } from "nanoid";
import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import slugify from "slugify";
import AWS from "commonplace-utilities/lib/AWS";
import { Context } from "../../context";

export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPost", {
      type: "Post",
      args: {
        interestId: nonNull(stringArg()),
        contentType: nonNull(stringArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),

        text: nullable(stringArg()),

        file1Name: nullable(stringArg()),
        file1Size: nullable(intArg()),
        file1Type: nullable(stringArg()),
        file1Data: nullable(stringArg()),

        file2Name: nullable(stringArg()),
        file2Size: nullable(intArg()),
        file2Type: nullable(stringArg()),
        file2Data: nullable(stringArg()),
      },
      resolve: async (
        _,
        {
          interestId,
          contentType,
          title,
          description,
          text,
          file1Name,
          file1Size,
          file1Type,
          file1Data,
          file2Name,
          file2Size,
          file2Type,
          file2Data,
        },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info(
          "Create Post",
          interestId,
          contentType,
          title,
          description,
          text,
          file1Name,
          file1Size,
          file1Type,
          file2Name,
          file2Size,
          file2Type
        );

        const aws = new AWS();

        // deduct credits if interest allows

        const interest = await prisma.interest.findFirst({
          where: {
            id: interestId,
          },
          include: {
            posts: true,
          },
        });

        // more than 5 posts in selected interst
        if (interest && interest?.posts?.length > 5) {
          const newCredit = (currentUser?.credit as number) - 3;

          if (newCredit < 0) {
            throw Error("Not enough Credits");
          }

          await prisma.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              credit: newCredit,
            },
          });
        }

        let upload1Path = "";
        if (file1Name && file1Data) {
          upload1Path = (await aws.uploadAsset(
            contentType,
            file1Name,
            file1Type,
            file1Size,
            file1Data
          )) as string;
        }

        let upload2Path = "";
        if (file2Name && file2Data) {
          upload2Path = (await aws.uploadAsset(
            "image", // file2 is always image
            file2Name,
            file2Type,
            file2Size,
            file2Data
          )) as string;
        }

        const generatedTitleSlug = slugify(title) + "-" + nanoid(10);

        console.info(
          "generatedTitleSlug",
          upload1Path,
          upload2Path,
          generatedTitleSlug
        );

        // if (!utilities.helpers.isDefinedWithContent(upload1Path)) {
        //   throw Error(utilities.ERROR_CODES.C010);
        // }

        let contentData = {
          contentPreview: upload2Path,
          content: upload1Path,
        };

        if (contentType === "text" && text) {
          contentData = {
            contentPreview: "",
            content: text,
          };
        }

        const post = await prisma.post.create({
          data: {
            title,
            description,
            generatedTitleSlug,
            contentType,
            ...contentData,
            interest: {
              connect: {
                id: interestId,
              },
            },
            creator: {
              connect: {
                id: currentUser.id,
              },
            },
          },
        });

        console.info(
          "create post, intersts",
          interestId,
          interest,
          interest?.posts?.length
        );

        mixpanel.track("Post Created", { post });

        console.info("Created post", post);

        return post;
      },
    });
  },
});
