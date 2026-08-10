import type { Request } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

export const kycUpload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, PNG, WEBP images and PDF documents are allowed."),
      );
    }

    cb(null, true);
  },
});
