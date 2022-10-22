-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_favoriteInterestId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "favoriteInterestId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteInterestId_fkey" FOREIGN KEY ("favoriteInterestId") REFERENCES "Interest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
