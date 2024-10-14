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


const getAllMarks = async (req, res) => {
    try {
        const marks = await Marks.getAll();
        res.status(200).json(marks);
    } catch (error) {
        console.error('Error in getAllMarks:', error);
        res.status(500).json({ error: 'Could not get marks' });
    }
}

const getMarkByRegNumber = async (req, res) => {
    try {
        const regNumber = req.query.regNumber;
        const mark = await Marks.getCoByRegNumber(regNumber);
        res.status(200).json(mark);
    } catch (error) {
        console.error('Error in getMarkByRegNumber:', error);
        res.status(500).json({ error: 'Could not get mark' });
    }
}

export const getMarkDetails = async (req, res) => {
    try {
        const { regNumber } = req.query;
        if (regNumber) {
            const mark = await getMarkByRegNumber(req, res);
            res.status(200).json(mark);
        } else {
            const marks = await getAllMarks(req, res);
            res.status(200).json(marks);
        }
    } catch (error) {
        console.error('Error in getMarkDetails:', error);
        res.status(500).json({ error: 'Could not get mark details' });
    }
}