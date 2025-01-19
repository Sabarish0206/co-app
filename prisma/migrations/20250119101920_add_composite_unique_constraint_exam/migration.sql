/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,semester,year]` on the table `Exam` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exam_subjectId_semester_year_key" ON "Exam"("subjectId", "semester", "year");
