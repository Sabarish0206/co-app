/*
  Warnings:

  - You are about to drop the column `subjectId` on the `CO` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `StudentCOMark` table. All the data in the column will be lost.
  - Added the required column `examId` to the `CO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coTotal` to the `StudentCOMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `StudentCOMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CO" DROP CONSTRAINT "CO_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCOMark" DROP CONSTRAINT "StudentCOMark_subjectId_fkey";

-- AlterTable
ALTER TABLE "CO" DROP COLUMN "subjectId",
ADD COLUMN     "examId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentCOMark" DROP COLUMN "subjectId",
ADD COLUMN     "coTotal" INTEGER NOT NULL,
ADD COLUMN     "examId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CO" ADD CONSTRAINT "CO_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCOMark" ADD CONSTRAINT "StudentCOMark_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
