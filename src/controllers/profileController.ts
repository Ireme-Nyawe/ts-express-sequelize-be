import { Request, Response } from "express";
import {profileService} from "../services/profileService";
const createProfile = async (req: Request, res: Response) => {
    try {
         const files = req.files as Express.Multer.File[];
  const file = files?.[0]; // first file regardless of field name
  if (!file) return res.status(400).json({ message: "File is required" });
        const profile = await profileService.createProfile(req, file.buffer);
        return res.status(201).json(profile);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const getProfileById = async (req: Request, res: Response ) => {
    try {
        const userId = req.params.id ;
        const profile = await profileService.getProfileById(userId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.status(200).json(profile);
    }
    catch (error: any) {
        return res.status(400).json({ message: error.message });
    }   
}

const getProfile = async (req: Request, res: Response) => {
    try {
        const profile = await profileService.getProfile();
        return res.status(200).json(profile);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    try {
         const files = req.files as Express.Multer.File[];
  const file = files?.[0]; // first file regardless of field name
        const userId = req.params.userId; 
        const updatedProfile = await profileService.updateProfile(userId, req.body, file?.buffer||null);
        return res.status(200).json(updatedProfile);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await profileService.deleteProfile(userId);
        return res.status(204).send();
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

export const profileController = {
    createProfile,
    getProfileById,
    getProfile,
    updateProfile,
    deleteProfile
};