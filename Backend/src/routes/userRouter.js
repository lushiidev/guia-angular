import { Router } from 'express';

// import { actualizarUsuario, getAllUsers, getBuscarNombre, getUserByEmail, postCrearUsuario, eliminarUsuario} from '../services/usersServices.js';

import * as userController from '../Controllers/userController.js';
// import { createUserValidators, deleteUsuario,runValidations } from '../Middlewares/validator.js';

const router = Router();

router.get('/', userController.getObtenerTodosLosUsuarios);

// router.get('/buscarPorEmail/:email', getUserByEmail);
router.get('/buscarPorEmail/:email', userController.getObtenerPorEmail)

// router.get('/buscarPorNombre/:nombre', async (req, res) => {
//     const {nombre} = req.params;
//     try{
//         const allUsersByName = await getBuscarNombre(nombre);
//         res.json(allUsersByName);
//     } catch (err) {
//         res.status(500).json({ error: err.message});
//     }
// });

router.get('/buscarPorNombre/:nombre', userController.getObtenerPorNombre)

router.post('/', userController.postCrearUsuario)

router.post('/login', userController.login)

router.put('/:id_usuario', userController.putModificarUser)

router.delete('/:id_usuario', userController.deleteUser)

// // Ruta para eliminar un usuario (DELETE /users/:id_usuario)
// router.delete('/:id_usuario', async (req, res) => {
//     try {
//         // Extraemos el id_usuario de los parámetros de la URL
//         const { id_usuario } = req.params;

//         // Llamamos al servicio que maneja la eliminación en la BD
//         const result = await eliminarUsuario(id_usuario);

//         // Respondemos con el resultado de la eliminación
//         res.status(200).json(result);
//     } catch (err) {
//         // Si hay error, respondemos con un mensaje de error
//         res.status(500).json({ error: err.message });
//     }
// });

export default router;