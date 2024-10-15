import Marks from "../Models/markTable.js";
export const insertMark = async (req, res) => {
    try {
        const marksArray = req.body; // Assuming req.body is an array of mark objects
        const insertedMarks = [];

        for (const mark of marksArray) {
            const insertedMark = await Marks.upsertMarks(mark);
            insertedMarks.push(insertedMark); // Collect each inserted/updated mark
        }

        res.status(200).json(insertedMarks); // Return all inserted/updated marks
    } catch (error) {
        console.error('Error in insertMark:', error);
        res.status(500).json({ error: 'Could not insert marks' });
    }
};


const getAllCo = async (req, res) => {
    try {
        const marks = await Marks.getAll();
        res.status(200).json(marks);
    } catch (error) {
        console.error('Error in getAllMarks:', error);
        res.status(500).json({ error: 'Could not get marks' });
    }
}

const getCoByRegNumber = async (req, res) => {
    try {
        const regNumber = req.query.regNumber;
        const mark = await Marks.getCoByRegNumber(regNumber);
        res.status(200).json(mark);
    } catch (error) {
        console.error('Error in getMarkByRegNumber:', error);
        res.status(500).json({ error: 'Could not get mark' });
    }
}

const getCoBySubjectCode = async (req, res) => {
    try {
        const subjectCode = req.query.subjectCode;
        const mark = await Marks.getCoBySubjectCode(subjectCode);
        res.status(200).json(mark);
    } catch (error) {
        console.error('Error in getMarkBySubjectCode:', error);
        res.status(500).json({ error: 'Could not get mark' });
    }
}

export const getCoDetails = async (req, res) => {
    try {
        const { regNumber, subjectCode } = req.query;
        if (regNumber) {
            const mark = await getCoByRegNumber(req, res);
            res.status(200).json(mark);
        } else if (subjectCode) {
            const mark = await getCoBySubjectCode(req, res);
            res.status(200).json(mark);
        } else {
            const marks = await getAllCo(req, res);
            res.status(200).json(marks);
        }
    } catch (error) {
        console.error('Error in getMarkDetails:', error);
        res.status(500).json({ error: 'Could not get mark details' });
    }
}