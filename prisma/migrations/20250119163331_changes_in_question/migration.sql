/*
  Warnings:

  - You are about to drop the column `bi` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_coId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "bi",
ADD COLUMN     "bl" TEXT,
ALTER COLUMN "coId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_coId_fkey" FOREIGN KEY ("coId") REFERENCES "CO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
