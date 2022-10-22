-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteInterestId" TEXT NOT NULL DEFAULT E'';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteInterestId_fkey" FOREIGN KEY ("favoriteInterestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
