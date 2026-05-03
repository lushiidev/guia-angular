import * as tasksService from '../services/tasksService.js'


export const obtenerTareas = async (req, res, next) => {
    try {
        // 1. Extraemos el ID del usuario que el guardia (middleware) nos dejó guardado
        const idDelUsuario = req.usuarioId;
        console.log('ID del usuario:', idDelUsuario);

        // 2. Llamamos a tu servicio pasándole ese ID
        const tareasDelUsuario = await tasksService.getTasks(idDelUsuario);

        // 3. El servicio ya devuelve las tareas en camelCase, enviamos directo
        res.json(tareasDelUsuario);

    } catch (err) {
        return next(err);
    }
};

export const postCrearTasks = async(req,res, next) =>{
    try{

        const idusuario = req.usuarioId;
        const {nombretarea, nombreTarea, descripcion, completado } = req.body;
        const nombreTareaFinal = nombretarea || nombreTarea;

        const newTasks = await tasksService.postCrearTasks(idusuario,nombreTareaFinal, descripcion, completado);

        res.json(newTasks)
    } catch (err) {
        return next(err)
    }
}

export const putModificarTasks = async(req, res, next) => {
    try {
            const { nombretarea, nombreTarea, descripcion, completado } = req.body;
            const nombreTareaFinal = nombretarea || nombreTarea;

            const { idtarea, idTarea } = req.params;
            const idtareaFinal = idtarea || idTarea;

            const tarea = [nombreTareaFinal, descripcion, completado, idtareaFinal];

            const updatedTarea = await tasksService.actualizarTarea(tarea)

            res.json(updatedTarea);

        } catch(err) {
            return next(err)
        }
}

export const deleteTasks = async(req, res, next) => {
    try {
        const {idtarea} = req.params;

        const resultDeleteTasks = await tasksService.eliminarTarea(idtarea)

        res.json(resultDeleteTasks)
    } catch (err) {
        return next(err)
    }
}