/*
  Warnings:

  - You are about to drop the column `postId` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_postId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
