/*
  Warnings:

  - You are about to drop the column `generatedNameSlug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `generatedNameSlug` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `generatedNameSlug` on the `Modifier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[generatedCategorySlug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedInterestSlug]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedModifierSlug]` on the table `Modifier` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE "Category" ADD COLUMN "generatedCategorySlug" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN "generatedInterestSlug" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Modifier" ADD COLUMN "generatedModifierSlug" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
-- CREATE UNIQUE INDEX "Category_generatedCategorySlug_key" ON "Category"("generatedCategorySlug");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_generatedInterestSlug_key" ON "Interest"("generatedInterestSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Modifier_generatedModifierSlug_key" ON "Modifier"("generatedModifierSlug");
