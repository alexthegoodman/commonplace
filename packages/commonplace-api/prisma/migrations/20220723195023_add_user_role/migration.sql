/*
  Warnings:

  - A unique constraint covering the columns `[generatedCategorySlug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedInterestSlug]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Category_generatedCategorySlug_key" ON "Category"("generatedCategorySlug");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_generatedInterestSlug_key" ON "Interest"("generatedInterestSlug");
