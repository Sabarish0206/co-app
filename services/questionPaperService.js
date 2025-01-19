import { unlinkSync } from 'fs';
import { parseDocxTables } from './qp parser/parser.js';
import { getSubjectByCode } from './subjectService.js';
import {createCos} from './coService.js';

export const parseQuestionPaper = async (filePath, subject, exam) => {
    const questionPaper = await parseDocxTables(filePath);
    unlinkSync(filePath);
    return questionPaper;
}

export const createQuestions = async (subject,questions, exam) => {

    const subjectId =await getSubjectByCode(subject);
    // const examId = getExamByName(exam).id;

    // Identify co from each subject and create a unique co list
    const coSet = new Set();
    console.log(questions);
    questions.forEach(question => {
      if (question.co) {
        coSet.add(question.co);
      }
    });

    const coObjects = Array.from(coSet).map(co => ({
      name: co,
      description: "",
      subject_id: subjectId.id
    }));

    //Push COs to CO Table
    const co =await createCos(coObjects);

    // return await coObjects;
}
