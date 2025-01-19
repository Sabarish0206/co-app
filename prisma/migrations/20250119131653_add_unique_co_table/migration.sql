/*
  Warnings:

  - A unique constraint covering the columns `[name,examId]` on the table `CO` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `CO` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CO" DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CO_name_examId_key" ON "CO"("name", "examId");
