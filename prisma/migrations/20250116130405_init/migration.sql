-- CreateEnum
CREATE TYPE "Role" AS ENUM ('faculty', 'admin');

-- CreateEnum
CREATE TYPE "ExamName" AS ENUM ('SerialTest1', 'SerialTest2', 'SerialTest3', 'SemesterExam1', 'SemesterExam2');

-- CreateEnum
CREATE TYPE "Year" AS ENUM ('I', 'II', 'III', 'IV');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CO" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "CO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "name" "ExamName" NOT NULL,
    "subjectId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "coId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "pi" TEXT,
    "bi" TEXT,
    "option" TEXT,
    "subDivision" TEXT,
    "no" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "year" "Year" NOT NULL,
    "sec" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "StudentMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentCOMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "coId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "StudentCOMark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNumber_key" ON "Student"("rollNumber");

-- AddForeignKey
ALTER TABLE "CO" ADD CONSTRAINT "CO_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_coId_fkey" FOREIGN KEY ("coId") REFERENCES "CO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMark" ADD CONSTRAINT "StudentMark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMark" ADD CONSTRAINT "StudentMark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCOMark" ADD CONSTRAINT "StudentCOMark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCOMark" ADD CONSTRAINT "StudentCOMark_coId_fkey" FOREIGN KEY ("coId") REFERENCES "CO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCOMark" ADD CONSTRAINT "StudentCOMark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
