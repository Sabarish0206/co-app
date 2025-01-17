import * as subjectService from "../services/subjectService.js";

export const getAllSubjects = async (req, res) => {
        try {
            const subjects = await subjectService.getAllSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    };

export const createSubject = async (req, res) => {
        try {
            const subject = await subjectService.createSubject(req.body);
            res.status(201).json(subject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

export const getSubjectById = async (req, res) => {
        try {
            const subject = await subjectService.getSubjectById(req.body.id);
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

export const getSubjectByCode = async (req, res) => {
        try {
            const subject = await subjectService.getSubjectByCode(req.params.code);
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

export const deleteSubject = async (req, res) => {
        try {
            const subject = await subjectService.deleteSubject(req.body.id);
            res.status(200).json(subject);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };