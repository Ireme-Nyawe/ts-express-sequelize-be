import { Request, Response } from "express";
import { commentService } from "../services/commentService";

const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.createComment(
      req.params.postId,
      req.user?.id,
      req.body.content,
      req.body.parentCommentId,
      req.body.authorName
    );
    return res.status(201).json(comment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const createReply = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.createComment(
      null,
      req.user?.id,
      req.body.content,
      req.params.commentId,
      req.body.authorName
    );
    return res.status(201).json(comment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getCommentsByPostId(req.params.postId);
    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.updateComment(
      req.params.commentId,
      {
        content: req.body.content
      },
      req.user
    );
    return res.status(200).json(comment);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    await commentService.deleteComment(req.params.commentId, req.user);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const commentController = {
  createComment,
  createReply,
  getCommentsByPost,
  updateComment,
  deleteComment
};