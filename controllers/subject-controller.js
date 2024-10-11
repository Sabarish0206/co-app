import Subject from '../Models/subjectTable.js';

// Create a subject
export const insertSubject = async (req, res) => {
    await  Subject.createTable();
    try {
        const subject = req.body;
        const insertedSubject = await Subject.insert(subject);
        res.status(200).json(insertedSubject);
    } catch (error) {
        console.error('Error in insertSubject:', error);
        res.status(500).json({ error: 'Could not insert subject' });
    }
}

// Get all subjects
export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.getAll();
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error in getAllSubjects:', error);
        res.status(500).json({ error: 'Could not get subjects' });
    }
}

// Get subject by code
export const getSubjectByCode = async (req, res) => {
    try {
        const subjectCode = req.query.subjectCode;
        const subject = await Subject.getByCode(subjectCode);
        if (subject) {
            res.status(200).json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        console.error('Error in getSubjectByCode:', error);
        res.status(500).json({ error: 'Could not get subject' });
    }
}

// Create the "Subject" table
export const createSubjectTable = async (req, res) => {
    try {
        await Subject.createTable();
        res.status(200).json({ message: 'Subject table created successfully' });
    } catch (error) {
        console.error('Error in createSubjectTable:', error);
        res.status(500).json({ error: 'Could not create subject table' });
    }
}

// Fetch subject details based on optional parameters
export const getSubjectDetails = async (req, res) => {
    try {
        const { subjectCode } = req.query;

        if (subjectCode) {
            const subject = await getSubjectByCode(req, res);
            res.status(200).json(subject);
        } else {
            const subjects = await getAllSubjects(req, res);
            res.status(200).json(subjects);
        }
    } catch (error) {
        console.error('Error in getSubjectDetails:', error);
        res.status(500).json({ error: 'Could not get subject details' });
    }
}
