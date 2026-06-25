import { Request, Response } from "express";
import { experienceService } from "../services/experienceService";

const createExperience = async (req: Request, res: Response) => {
  try {
    const experience = await experienceService.createExperience(req.body);
    return res.status(201).json(experience);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getExperienceById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const experience = await experienceService.getExperienceById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    return res.status(200).json(experience);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await experienceService.getExperiences();
    return res.status(200).json(experiences);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateExperience = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedExperience = await experienceService.updateExperience(id, req.body);
    return res.status(200).json(updatedExperience);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteExperience = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await experienceService.deleteExperience(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const experienceController = {
  createExperience,
  getExperienceById,
  getExperiences,
  updateExperience,
  deleteExperience
};
