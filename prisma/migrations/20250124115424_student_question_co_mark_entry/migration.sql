/*
  Warnings:

  - You are about to drop the column `examId` on the `StudentCOMark` table. All the data in the column will be lost.
  - You are about to drop the column `marks` on the `StudentCOMark` table. All the data in the column will be lost.
  - You are about to drop the `StudentMark` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,coId]` on the table `StudentCOMark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mark` to the `StudentCOMark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentCOMark" DROP CONSTRAINT "StudentCOMark_examId_fkey";

-- DropForeignKey
ALTER TABLE "StudentMark" DROP CONSTRAINT "StudentMark_questionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentMark" DROP CONSTRAINT "StudentMark_studentId_fkey";

-- AlterTable
ALTER TABLE "StudentCOMark" DROP COLUMN "examId",
DROP COLUMN "marks",
ADD COLUMN     "mark" INTEGER NOT NULL;

-- DropTable
DROP TABLE "StudentMark";

-- CreateTable
CREATE TABLE "StudentQuestionMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "mark" INTEGER NOT NULL,

    CONSTRAINT "StudentQuestionMark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentQuestionMark_studentId_questionId_key" ON "StudentQuestionMark"("studentId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCOMark_studentId_coId_key" ON "StudentCOMark"("studentId", "coId");

-- AddForeignKey
ALTER TABLE "StudentQuestionMark" ADD CONSTRAINT "StudentQuestionMark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentQuestionMark" ADD CONSTRAINT "StudentQuestionMark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
