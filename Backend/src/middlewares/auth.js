import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    // 1. Buscamos el token en la "cabecera" de la petición
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No enviaste el pase VIP (Token)' });
    }

    try {
        // 2. Verificamos si el pase es auténtico y no ha expirado
        const decodificado = jwt.verify(token, process.env.MY_SECRET);
        
        // 3. ¡El secreto revelado! Guardamos el ID en la petición
        req.usuarioId = decodificado.id_usuario; 
        
        // 4. Le damos permiso de pasar al controlador
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};