/*
  Warnings:

  - A unique constraint covering the columns `[generatedUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chosenUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_generatedUsername_key" ON "User"("generatedUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_chosenUsername_key" ON "User"("chosenUsername");
