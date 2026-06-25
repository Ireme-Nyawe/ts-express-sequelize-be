import { Request, Response } from "express";
import { authService } from "../services/authService";

const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const profile = async (req: Request, res: Response) => {
  const user = await authService.getProfile(req.user!.id);
  res.json(user);
};

const update = async (req: Request, res: Response) => {
  try {
    const updated = await authService.updateUser(
      req.params.id as any,
      req.body,
    );
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  await authService.deleteUser(Number(req.params.id));
  res.json({ message: "User deleted" });
};

export const authController = { register, login, profile, update, deleteUser };
