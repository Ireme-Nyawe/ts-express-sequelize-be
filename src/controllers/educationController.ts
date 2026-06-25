import { Request, Response } from "express";
import { educationService } from "../services/educationService";

const createEducation = async (req: Request, res: Response) => {
  try {
    const education = await educationService.createEducation(req.body);
    return res.status(201).json(education);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getEducationById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const education = await educationService.getEducationById(id);
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }
    return res.status(200).json(education);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getEducations = async (req: Request, res: Response) => {
  try {
    const educations = await educationService.getEducations();
    return res.status(200).json(educations);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateEducation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedEducation = await educationService.updateEducation(id, req.body);
    return res.status(200).json(updatedEducation);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteEducation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await educationService.deleteEducation(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const educationController = {
  createEducation,
  getEducationById,
  getEducations,
  updateEducation,
  deleteEducation
};
