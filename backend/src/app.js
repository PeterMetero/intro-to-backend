import express from 'express';

const app = express();  // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

// route import
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// example route http://localhost:8000/api/v1/users/register


export default app;