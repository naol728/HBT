import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API 🚀",
  });
});

export default router;
