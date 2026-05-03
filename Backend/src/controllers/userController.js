import * as userService from '../services/userService.js'
import bcrypt, { compareSync, hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
    try {
        const resultUsuarios = await userService.getAllUsers();
        res.json(resultUsuarios)
    } catch (err) {
        // res.status(500).json({error: err.Message})
        return next(err);
    }
}

export const getObtenerPorEmail = async (req, res,next) => {
    try {
        const {email} = req.params;
        const resultPorEmail = await userService.getUserByEmail(email);
        res.json(resultPorEmail)
    } catch (err) {
        // res.status(500).json({error: err.Message})
        return next(err);
    }
}

export const getObtenerPorNombre = async (req, res, next) => {
    try {
        const {nombre} = req.params;
        const resultPorNombre = await userService.getBuscarNombre(nombre);
        res.json(resultPorNombre)
    } catch (err) {
        // res.status(500).json({error: err.Message})
        return next(err);
    }
}

export const postCrearUsuario = async(req,res, next) =>{
    try{
        const {nombre, email, contrasenia, password } = req.body;
        const pass = contrasenia || password;

        const newUser = await userService.postCrearUsuario(nombre, email, pass);

        res.json(newUser)
    } catch (err) {
        return next(err)
    }
}

export const putModificarUser = async(req, res, next) => {
    try {
            const { nombre, email, contrasenia} = req.body;
    
            const { idusuario } = req.params;
    
            const usuario = [nombre, email, contrasenia, idusuario];
    
            const updatedUser = await userService.actualizarUsuario(usuario)
    
            res.json(updatedUser);
    
        } catch(err) {
            return next(err)
        }
}

export const deleteUser = async(req, res, next) => {
    try {
        const { idusuario} = req.params;

        const resultDeleteUser = await userService.eliminarUsuario(idusuario)

        res.json(resultDeleteUser)
    } catch (err) {
        return next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        // 1. Recibimos los datos del formulario de Angular
        const { email, contrasenia, password } = req.body;
        const pass = contrasenia || password;

        // 2. Buscamos al usuario en la base de datos
        const usuarios = await userService.getUserByEmail(email);
        
        if (usuarios.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const usuario = usuarios[0]; // Extraemos el primer usuario encontrado

        // 3. Comparamos las contraseñas
        const contraseniaValida = bcrypt.compareSync(pass, usuario.contrasenia);

        // 4. Si la contraseña es inválida, regresamos un error
        if (!contraseniaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 5. Aquí generaremos el JWT (siguiente paso)
        const payload = { idusuario: usuario.idusuario };
        const token = jwt.sign(payload, process.env.MY_SECRET, { expiresIn: '2h' }) 

        res.json({ mensaje: '¡Login exitoso por ahora!', token});

    } catch (err) {
        return next(err);
    }
};