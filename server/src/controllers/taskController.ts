import { Response } from "express";
import { db } from "../config/firebase";
import Task from "../models/task";

type Request = {
  body: Task;
  connection: any;
  headers: any;
  params: { taskId: string };
};

/**
 * Get All Tasks from Firebase Collection
 * @param  {Request} req
 * @param  {Response} res
 */
const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks: Task[] = [];
    const querySnapshot = await db.collection("tasks").get();
    querySnapshot.forEach((doc: any) => allTasks.push(doc.data()));
    res.status(200).json(allTasks);
  } catch (error) {
    console.error(`500 GET/tasks; error:${error}`);
    res.status(500).json(error.message);
  }
};

/**
 * Adds one Task to the Firebase Collection
 * @param  {Request} req
 * @param  {Response} res
 */
const addTask = async (req: Request, res: Response) => {
  const { description, startedAt, finishedAt, time } = req.body;
  try {
    const task = db.collection("tasks").doc();
    const taskObject = {
      id: task.id,
      description: description,
      time,
      startedAt,
      finishedAt,
      createdAt: new Date(),
    };

    await task.set(taskObject);

    res.status(200).send({
      status: "success",
      message: "task added successfully",
      data: taskObject,
    });
  } catch (error) {
    console.error(`500 POST/tasks; error:${error}`);
    res.status(500).json(error.message);
  }
};

/**
 * Update one Task from Firebase Collection
 * @param  {Request} req
 * @param  {Response} res
 */
const updateTask = async (req: Request, res: Response) => {
  const {
    body: { startedAt, finishedAt, time },
    params: { taskId },
  } = req;

  try {
    const task = db.collection("tasks").doc(taskId);
    const currentData = (await task.get()).data() || {};
    console.log(currentData);

    const taskObject = {
      id: currentData.id,
      description: currentData.description,
      time: time,
      startedAt: startedAt,
      finishedAt: finishedAt,
      createdAt: currentData.createdAt,
      updatedAt: new Date(),
    };

    await task.set(taskObject).catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });

    res.status(200).json({
      status: "success",
      message: "task updated successfully",
      data: taskObject,
    });
  } catch (error) {
    console.error(`500 PATCH/tasks; error:${error}`);
    res.status(500).json(error.message);
  }
};

export { addTask, getAllTasks, updateTask };
