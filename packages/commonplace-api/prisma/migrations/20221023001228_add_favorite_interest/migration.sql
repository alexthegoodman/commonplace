-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteInterestId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteInterestId_fkey" FOREIGN KEY ("favoriteInterestId") REFERENCES "Interest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
