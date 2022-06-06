/*
  Warnings:

  - A unique constraint covering the columns `[generatedNameSlug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedNameSlug]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generatedNameSlug]` on the table `Modifier` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "generatedNameSlug" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "generatedNameSlug" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Modifier" ADD COLUMN     "generatedNameSlug" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Category_generatedNameSlug_key" ON "Category"("generatedNameSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_generatedNameSlug_key" ON "Interest"("generatedNameSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Modifier_generatedNameSlug_key" ON "Modifier"("generatedNameSlug");
