import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

import userRouter from './routes/userRouter.js'
import tasksRouter from './routes/tasksRouter.js'

dotenv.config();

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));
app.use(express.json()); 


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola unicaes');
});

app.use('/users', userRouter)
app.use('/tasks', tasksRouter)

// Encendemos el servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})