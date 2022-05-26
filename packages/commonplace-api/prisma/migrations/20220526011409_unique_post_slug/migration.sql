/*
  Warnings:

  - A unique constraint covering the columns `[generatedTitleSlug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_generatedTitleSlug_key" ON "Post"("generatedTitleSlug");
