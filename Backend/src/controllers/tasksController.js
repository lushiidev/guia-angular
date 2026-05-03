import * as tasksService from '../services/tasksService.js'


export const obtenerTareas = async (req, res, next) => {
    try {
        // 1. Extraemos el ID del usuario que el guardia (middleware) nos dejó guardado
        const idDelUsuario = req.usuarioId;

        // 2. Llamamos a tu servicio pasándole ese ID
        const tareasDelUsuario = await tasksService.getTasks(idDelUsuario);

        // 3. Enviamos las tareas al Frontend
        res.json(tareasDelUsuario);

    } catch (err) {
        return next(err);
    }
};

export const postCrearTasks = async(req,res, next) =>{
    try{
        
        const idusuario = req.usuarioId;
        const {nombretarea, descripcion, completado } = req.body;
        
        const newTasks = await tasksService.postCrearTasks(idusuario,nombretarea, descripcion, completado);

        res.json(newTasks)
    } catch (err) {
        return next(err)
    }
}

export const putModificarTasks = async(req, res, next) => {
    try {
            const { nombretarea, descripcion, completado} = req.body;
    
            const { idtarea } = req.params;
    
            const tarea = [nombretarea, descripcion, completado, idtarea];
    
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