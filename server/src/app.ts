import express from "express";
import cors from "cors";

import indexRoute from "./routes/index.route";
import authRoute from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRoute);
app.use("/api/auth", authRoute);

export default app;
