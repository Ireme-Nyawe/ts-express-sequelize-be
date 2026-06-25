import { Request, Response } from 'express';
import { postLikeService } from '../services/postLikeService';

const getClientIp = (req: Request): string => {
  const ip = req.ip || 'unknown';

  return ip.replace('::ffff:', '');
};

const getPostId = (req: Request): number => {
  const postId = Number(req.params.postId);

  if (Number.isNaN(postId)) {
    throw new Error('Invalid post id');
  }

  return postId;
};

const likePost = async (req: Request, res: Response) => {
  try {
    const result = await postLikeService.likePost(
      getPostId(req),
      getClientIp(req)
    );

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const unlikePost = async (req: Request, res: Response) => {
  try {
    const result = await postLikeService.unlikePost(
      getPostId(req),
      getClientIp(req)
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const isLikedByIp = async (req: Request, res: Response) => {
  try {
    const result = await postLikeService.isLikedByIp(
      getPostId(req),
      getClientIp(req)
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

const getPostLikes = async (req: Request, res: Response) => {
  try {
    const result = await postLikeService.getPostLikes(
      getPostId(req),
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const postLikeController = {
  likePost,
  unlikePost,
  isLikedByIp,
  getPostLikes
};