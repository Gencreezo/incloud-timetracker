import { addTask, getAllTasks, updateTask } from "./controllers/taskController";

const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "*",
  })
);

// Task Api
app.get("/api/tasks", getAllTasks);
app.post("/api/tasks", addTask);
app.patch("/api/tasks/:taskId", updateTask);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
