import { Request, Response } from "express";
import { messageService } from "../services/messageService";

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await messageService.createMessage(req.body);
    return res.status(201).json(message);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const message = await messageService.getMessageById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json(message);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await messageService.getMessages();
    return res.status(200).json(messages);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedMessage = await messageService.updateMessage(id, req.body);
    return res.status(200).json(updatedMessage);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await messageService.deleteMessage(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const messageController = {
  createMessage,
  getMessageById,
  getMessages,
  updateMessage,
  deleteMessage
};
