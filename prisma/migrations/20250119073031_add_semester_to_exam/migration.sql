/*
  Warnings:

  - You are about to drop the column `semester` on the `CO` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CO" DROP COLUMN "semester";

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "semester" INTEGER NOT NULL;
