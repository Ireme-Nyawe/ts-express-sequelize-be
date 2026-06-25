import { Request, Response } from "express";
import { skillsService } from "../services/skillsService";

const createSkills = async (req: Request, res: Response) => {
  try {
    const skills = await skillsService.createSkills(req.body);
    return res.status(201).json(skills);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await skillsService.getSkills();
    return res.status(200).json(skills);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const addSkill = async (req: Request, res: Response) => {
  try {
    const { category, item } = req.body;
    const skills = await skillsService.addSkill(category, item);
    return res.status(200).json(skills);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateSkill = async (req: Request, res: Response) => {
  try {
    const { category, oldItem, newItem } = req.body;
    const skills = await skillsService.updateSkill(category, oldItem, newItem);
    return res.status(200).json(skills);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { category, item } = req.body;
    await skillsService.deleteSkill(category, item);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const skillsController = {
  createSkills,
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
};
