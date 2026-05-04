import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Tareas } from './components/tareas/tareas';

export const routes: Routes = [{ path: 'login', component: Login},
    { path: 'toDo', component: Tareas }
];
