-- CreateEnum
CREATE TYPE "Department" AS ENUM ('CSE', 'IT', 'MECH', 'CIVIL', 'BME', 'EEE', 'ECE', 'AIDS', 'CSBS');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "department" "Department" NOT NULL DEFAULT 'CSE';
