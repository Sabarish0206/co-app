-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExamName" ADD VALUE 'Assignment1';
ALTER TYPE "ExamName" ADD VALUE 'Assignment2';
ALTER TYPE "ExamName" ADD VALUE 'Assignment3';
