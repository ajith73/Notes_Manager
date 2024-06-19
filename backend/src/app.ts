import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";

const app = express();
app.use(morgan("dev"));

app.use(express.json());
// Configure CORS to allow credentials
app.use(cors({
    origin: 'https://notes-manager-aemh.onrender.com',  // Your frontend URL
    credentials: true,
}));
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
    cookie: {
      maxAge: 60 * 60 * 1000, // Example: 1 hour
      secure: true, // Ensure secure cookie in HTTPS
      sameSite: 'none', // Adjust sameSite attribute as needed
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  }));

app.get('/', (req: Request, res: Response) => {
    res.send("Backend server is running successfully.");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;