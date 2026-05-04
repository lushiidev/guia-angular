import { pool } from "../db.js";

export const getTasks = async (idusuario) => {

    const result = await pool.query('SELECT * FROM tareas WHERE idusuario=$1', [idusuario]);

    // Convertir a camelCase
    return result.rows.map(t => ({
        idTarea: t.idtarea,
        nombreTarea: t.nombretarea,
        descripcion: t.descripcion,
        completado: t.completado
    }));
};


export const postCrearTasks = async (idusuario,nombretarea, descripcion, completado) => {

        const query = `INSERT INTO tareas
                (idusuario, nombretarea, descripcion, completado)
                VALUES ($1, $2, $3, $4) RETURNING *;`

        const result = await pool.query(query, [idusuario, nombretarea, descripcion, completado]);

        const tarea = result.rows[0];
        // Convertir a camelCase para el frontend
        return {
            idTarea: tarea.idtarea,
            nombreTarea: tarea.nombretarea,
            descripcion: tarea.descripcion,
            completado: tarea.completado
        };
}

export const actualizarTarea = async (tarea) => {
    const query = `UPDATE tareas
        SET nombretarea=$1, descripcion=$2,completado=$3
        WHERE idtarea=$4
        RETURNING *;`;

        const result = await pool.query(query, tarea);
        // Solo retornamos la primera fila (el usuario actualizado)
        const t = result.rows[0];
        return {
            idTarea: t.idtarea,
            nombreTarea: t.nombretarea,
            descripcion: t.descripcion,
            completado: t.completado
        };
};

export const eliminarTarea = async (idtarea) => {
        // Verificamos si el usuario existe
        const tareaAEliminar = await pool.query('SELECT * FROM tareas WHERE idtarea=$1', [idtarea]);

        // Si no existe, lanzamos un error
        if (tareaAEliminar.rowCount === 0) throw new Error('Tarea no encontrada');

        // Si existe, ejecutamos la sentencia DELETE
        const result = await pool.query('DELETE FROM tareas WHERE idtarea=$1', [idtarea]);

        // Confirmamos la eliminación
        return { message: 'Tarea eliminada correctamente', tarea: tareaAEliminar.rows[0] };
};