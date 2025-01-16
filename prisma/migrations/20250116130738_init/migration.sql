/*
  Warnings:

  - The values [SemesterExam1,SemesterExam2] on the enum `ExamName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamName_new" AS ENUM ('SerialTest1', 'SerialTest2', 'SerialTest3', 'oddSem', 'evenSem');
ALTER TABLE "Exam" ALTER COLUMN "name" TYPE "ExamName_new" USING ("name"::text::"ExamName_new");
ALTER TYPE "ExamName" RENAME TO "ExamName_old";
ALTER TYPE "ExamName_new" RENAME TO "ExamName";
DROP TYPE "ExamName_old";
COMMIT;
