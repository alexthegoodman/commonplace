-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_postId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
