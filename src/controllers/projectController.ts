import { Request, Response } from "express";
import { projectService } from "../services/projectService";

const createProject = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageBuffer = files?.[0]?.buffer; // undefined if no image uploaded

    const project = await projectService.createProject(req.body, imageBuffer);
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await projectService.getProjectById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getProjects();
    return res.status(200).json(projects);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const files = req.files as Express.Multer.File[];
    const imageBuffer = files?.[0]?.buffer;
    
    const updatedProject = await projectService.updateProject(id, req.body, imageBuffer);
    return res.status(200).json(updatedProject);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await projectService.deleteProject(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const projectController = {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
  deleteProject
};
