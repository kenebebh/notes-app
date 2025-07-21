import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/databaseConnection.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send(`Server is ready`));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
