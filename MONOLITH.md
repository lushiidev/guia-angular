# 🎯 Guía: Deployment en Render (Monolito)

Tu proyecto ahora es un **monolito**: Backend + Frontend servidos desde una sola instancia.

## Desarrollo Local

```bash
# Opción 1: Correr todo junto
npm run dev

# Opción 2: Correr por separado
npm run dev:backend   # Terminal 1
npm run dev:frontend  # Terminal 2
```

## Construcción para Producción

```bash
npm run build
```

Esto:
1. Compila Angular → `Frontend/dist/TodoListAngular/`
2. Instala dependencias del Backend

## Deployment en Render

### 1. Crea una nueva Web Service en Render
- Ve a https://dashboard.render.com
- "New" → "Web Service"
- Conecta tu repositorio GitHub

### 2. Configura el servicio

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm run build` |
| **Start Command** | `npm start` |
| **Environment** | Ver [.env.example](#variables-de-entorno) |

### 3. Variables de Entorno

Añade en Render dashboard:

```
PORT=3000
DB_HOST=tu_host_postgres
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_datos
MY_SECRET=tu_secret_jwt
```

### 4. Déployea

Render construirá y ejecutará automáticamente:
```
npm run build          # Compila Angular + Backend
npm start              # Inicia servidor en puerto 3000
```

Tu app estará en: `https://tu-app.onrender.com`

---

## Estructura Monolito

```
Backend/src/
  └─ index.js         ← Sirve:
                        - /api/* (rutas del backend)
                        - /* (archivos de Angular compilados)

Frontend/dist/
  └─ TodoListAngular/browser/ ← Build compilado de Angular
```

## Troubleshooting

**"Cannot find module"** en Render?
- Asegúrate de que `postinstall` en `package.json` haga una instalación limpia con `npm ci` en ambas carpetas.

**Angular no carga?**
- Verifica que `Frontend/dist/TodoListAngular/browser/index.html` exista localmente.
- Ejecuta: `npm run build` y revisa la carpeta.

**Puerto 3000 en uso?**
- Render ignora esto automáticamente. En local, cambia:
  ```bash
  PORT=3001 npm --prefix Backend start
  ```
