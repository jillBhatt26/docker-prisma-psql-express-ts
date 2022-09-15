import { Router } from 'express';
import { tasksRouter } from '../api';

const router: Router = Router();

router.use('/tasks', tasksRouter);

export default router;
