/*
  Warnings:

  - A unique constraint covering the columns `[no,subDivision,option,examId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_no_subDivision_option_examId_key" ON "Question"("no", "subDivision", "option", "examId");
