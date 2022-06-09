/*
  Warnings:

  - You are about to drop the `_userReadMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_userReadMessages" DROP CONSTRAINT "_userReadMessages_A_fkey";

-- DropForeignKey
ALTER TABLE "_userReadMessages" DROP CONSTRAINT "_userReadMessages_B_fkey";

-- DropTable
DROP TABLE "_userReadMessages";

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "threadId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_id_key" ON "Record"("id");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
