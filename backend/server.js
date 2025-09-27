import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------
// Middleware
// ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (!allowedOrigins.includes(origin)) {
      const msg = "CORS policy does not allow this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Handle OPTIONS requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// ---------------------
// Routes
// ---------------------
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// ---------------------
// Start Server
// ---------------------
app.listen(PORT, async () => {
  console.log(`Server listening at port ${PORT}`);
  await connectDB();
});
