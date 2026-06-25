import { Request, Response } from "express";
import { certificateService } from "../services/certificateService";

const createCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await certificateService.createCertificate(req.body);
    return res.status(201).json(certificate);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getCertificateById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const certificate = await certificateService.getCertificateById(id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(200).json(certificate);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const getCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await certificateService.getCertificates();
    return res.status(200).json(certificates);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const updateCertificate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedCertificate = await certificateService.updateCertificate(id, req.body);
    return res.status(200).json(updatedCertificate);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await certificateService.deleteCertificate(id);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const certificateController = {
  createCertificate,
  getCertificateById,
  getCertificates,
  updateCertificate,
  deleteCertificate
};
