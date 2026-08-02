import express from "express";
import cors from "cors";

import indexRoute from "./routes/index.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRoute);

export default app;
