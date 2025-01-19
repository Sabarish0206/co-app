/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,name,year]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Exam_subjectId_semester_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "Exam_subjectId_name_year_key" ON "Exam"("subjectId", "name", "year");
