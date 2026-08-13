import express from "express";
import cors from "cors";

import indexRoute from "./routes/index.route";
import authRoute from "./routes/auth.route";
import depositRoute from "./routes/deposit.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRoute);
app.use("/api/auth", authRoute);
app.use("/api/deposit", depositRoute);

export default app;
