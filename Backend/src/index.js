import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

import userRouter from './routes/userRouter.js'
import tasksRouter from './routes/tasksRouter.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola unicaes');
});

app.use('/users', userRouter)
app.use('/tasks', tasksRouter)

// Encendemos el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`)
})