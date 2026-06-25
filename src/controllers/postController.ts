import { Request, Response } from "express";
import { postService } from "../services/postService";

const createPost = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const post = await postService.createPost(req.body, req.user!.id, files ?? []);
    return res.status(201).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const post = await postService.updatePost(req.params.id, req.body, files ?? []);
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(req.params.id);
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json(posts);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


const deletePost = async (req: Request, res: Response) => {
  try {
    await postService.deletePost(req.params.id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const postController = {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost
};