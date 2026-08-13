import { Request, Response } from "express";
export const deposit = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      sucess: true,
      message: "sucess",
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      error: err,
    });
  }
};
export const paymentMethod = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      sucess: true,
      message: "sucess",
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      error: err,
    });
  }
};
