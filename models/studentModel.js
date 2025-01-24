import { Department } from '@prisma/client/wasm';
import prisma from '../config/db.js';

export const upsertStudent = async (student) => {
  try {
    return await prisma.student.upsert({
        where: { rollNumber: student.roll_number.toString() }, // Convert to string
        update: { 
          name: student.name,
          rollNumber: student.roll_number.toString(),  // Convert to string
          year: student.year,
          sec: student.sec,
        },
        create: { 
          name: student.name,
          rollNumber: student.roll_number.toString(),  // Convert to string
          year: student.year,
          sec: student.sec,
        },
      });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const findStudentsByYearAndSec = async (year, sec) => {
  try {
    return await prisma.student.findMany({
      where: {
        year: year,
        sec: sec,
      },
    });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};

export const findAll = async () => {
  try {
    return await prisma.student.findMany();
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

export const findStudentsByYearSecAndDept = async (year, sec, dept) => {
  try {
    return await prisma.student.findMany({
      where: {
        year: year,
        sec: sec,
        department: dept
      },
    });
  } catch (error) {
    throw new Error(`Database error: ${error.message}`);
  }
};