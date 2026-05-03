import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.js';

import * as tasksController from '../controllers/tasksController.js';

const router = Router();

router.get('/', verificarToken, tasksController.obtenerTareas);

router.post('/',verificarToken, tasksController.postCrearTasks)

router.put('/:idtarea',verificarToken, tasksController.putModificarTasks)

router.delete('/:idtarea',verificarToken, tasksController.deleteTasks)


export default router;