import { Router } from 'express';
import {
    fetchTasks,
    fetchTaskByID,
    fetchTaskByName,
    createNewTask,
    updateTask,
    deleteTask
} from '../controllers';

const router: Router = Router();

router.get('/', fetchTasks);

router.post('/', createNewTask);

router.get('/search', fetchTaskByName);

router.get('/:id', fetchTaskByID);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export { router as tasksRouter };
