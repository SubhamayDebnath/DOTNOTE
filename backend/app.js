import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/note", noteRoutes);

app.use("*", (req, res) => {
  res.status(404).send("OOPS ! 404 page not found :(");
});

app.use(errorMiddleware);

export default app;
