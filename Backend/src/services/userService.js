import { pool } from "../db.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async () => {

    const result = await pool.query('SELECT * FROM usuarios');

    return result.rows;
};

export const getUserByEmail = async (email) => {

        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows;
};

export const getBuscarNombre = async (nombre) => {
    
    const buscar = `%${nombre}%`

    const result = await pool.query(
        "SELECT * FROM usuarios WHERE nombre LIKE $1", [buscar]
    );
    return result.rows;
}

export const postCrearUsuario = async (nombre, email, contrasenia) => {
    const SALT_ROUNDS = 10;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    const contraseniaHashed = bcrypt.hashSync(contrasenia, salt)

        const query = `INSERT INTO usuarios
                (nombre, email, contrasenia)
                VALUES ($1, $2, $3) RETURNING *;`

        const result = await pool.query(query, [nombre, email, contraseniaHashed]);

        return result.rows[0];
}

export const actualizarUsuario = async (usuario) => {
    const query = `UPDATE usuarios
        SET nombre=$1, email=$2,contrasenia=$3
        WHERE idusuario=$4
        RETURNING *;`;

        const result = await pool.query(query, usuario);
        // Solo retornamos la primera fila (el usuario actualizado)
        return result.rows[0]; 
};

export const eliminarUsuario = async (idusuario) => {
        // Verificamos si el usuario existe
        const usuarioAEliminar = await pool.query('SELECT * FROM usuarios WHERE idusuario=$1', [idusuario]);

        // Si no existe, lanzamos un error
        if (usuarioAEliminar.rowCount === 0) throw new Error('Usuario no encontrado');

        // Si existe, ejecutamos la sentencia DELETE
        const result = await pool.query('DELETE FROM usuarios WHERE idusuario=$1', [idusuario]);

        // Confirmamos la eliminación
        return { message: 'Usuario eliminado correctamente', usuario: usuarioAEliminar.rows[0] };
};