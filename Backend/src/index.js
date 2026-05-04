import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRouter.js'
import tasksRouter from './routes/tasksRouter.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json()); 

// Servir archivos estáticos del frontend compilado
const frontendPath = path.join(__dirname, '../../Frontend/dist/TodoListAngular/browser');
app.use(express.static(frontendPath));

// API routes
app.use('/users', userRouter)
app.use('/tasks', tasksRouter)

// Servir el frontend para rutas no encontradas (SPA)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Encendemos el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`)
})