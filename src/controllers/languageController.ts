import { Request, Response } from "express";
import { languageService } from "../services/languageService";

const createLanguage = async (req: Request, res: Response) => {
  try {
    const language = await languageService.createLanguage(req.body);
    return res.status(201).json(language);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getLanguageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const language = await languageService.getLanguageById(id);

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    return res.status(200).json(language);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await languageService.getLanguages();
    return res.status(200).json(languages);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateLanguage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedLanguage = await languageService.updateLanguage(id, req.body);
    return res.status(200).json(updatedLanguage);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteLanguage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await languageService.deleteLanguage(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const languageController = {
  createLanguage,
  getLanguageById,
  getLanguages,
  updateLanguage,
  deleteLanguage,
};
