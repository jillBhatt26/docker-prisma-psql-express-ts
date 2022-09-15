import { PrismaClient, Task } from '@prisma/client';
import { Request, Response } from 'express';

const prismaClient = new PrismaClient();

const fetchTasks = async (_: Request, res: Response) => {
    try {
        const tasks: Task[] = await prismaClient.task.findMany();

        return res.status(200).json({ tasks });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while fetching tasks'
        });
    }
};

const fetchTaskByID = async (req: Request, res: Response) => {
    try {
        const task: Task | null = await prismaClient.task.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!task) {
            return res
                .status(404)
                .json({ message: 'Requested task not found!' });
        }

        return res.status(200).json({ task });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while fetching task'
        });
    }
};

const fetchTaskByName = async (req: Request, res: Response) => {
    if (!req.query.name || !req.query.name.length) {
        return res.status(400).json({ message: 'Task name is required!' });
    }

    try {
        console.log('input: ', req.query.name as string);

        const task: Task = await prismaClient.task.findFirstOrThrow({
            where: { name: req.query.name as string }
        });

        return res.status(200).json({ task });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while fetching task'
        });
    }
};

const createNewTask = async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.name.length) {
        return res.status(400).json({ message: 'Task name is required!' });
    }

    try {
        const task: Task = await prismaClient.task.create({
            data: {
                name: req.body.name
            }
        });

        return res.status(201).json({ task });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while creating task'
        });
    }
};

const updateTask = async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.name.length) {
        return res.status(400).json({ message: 'Task name is required!' });
    }

    try {
        const task: Task | null = await prismaClient.task.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!task) {
            return res
                .status(404)
                .json({ message: 'Task to update not found!' });
        }

        const updatedTask: Task = await prismaClient.task.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: req.body.name
            }
        });

        return res.status(200).json({ updatedTask });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while updating task'
        });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const task: Task | null = await prismaClient.task.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!task) {
            return res
                .status(404)
                .json({ message: 'Task to delete not found!' });
        }

        await prismaClient.task.delete({
            where: { id: parseInt(req.params.id) }
        });

        return res.status(200).json({ success: true });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || 'Error occurred while deleting task'
        });
    }
};

export {
    fetchTasks,
    fetchTaskByID,
    fetchTaskByName,
    createNewTask,
    updateTask,
    deleteTask
};
