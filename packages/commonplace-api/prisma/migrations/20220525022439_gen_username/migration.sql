-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "generatedTitleSlug" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "chosenUsername" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "generatedUsername" TEXT NOT NULL DEFAULT E'';
