/*
  Warnings:

  - Added the required column `semester` to the `CO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CO" ADD COLUMN     "semester" INTEGER NOT NULL;
