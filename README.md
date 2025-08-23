# 📌 To-Do List (React + Vite + Tailwind)

Aplicación de lista de tareas (CRUD) desarrollada con **React**, **Vite** y **TailwindCSS**.  
Permite agregar, editar, marcar como completada y eliminar tareas. Las tareas se guardan en **localStorage**.

---

## 🚀 Requisitos

- [Node.js 20.19+](https://nodejs.org/) o **22.12+**  
- npm (incluido con Node)

---

## ⚙️ Instalación

1. Clonar el repositorio o copiar la carpeta del proyecto:
   ```bash
   git clone <URL_DEL_REPO>
   cd to-do-list
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Instalar librería `uuid` (para generar IDs únicos):
   ```bash
   npm install uuid
   ```

---

## ▶️ Uso

Ejecutar en modo desarrollo:
```bash
npm run dev
```

Abrir la URL que muestre la terminal (ejemplo: `http://localhost:5173`).

---

## 🛠️ Construcción para producción

```bash
npm run build
```

Archivos generados en la carpeta `dist/`.

---

## 📂 Estructura principal

```
src/
 ├─ App.jsx                # Lógica principal y estado global
 ├─ main.jsx               # Punto de entrada
 ├─ index.css              # Configuración de Tailwind + estilos globales
 └─ components/
     ├─ TaskForm.jsx       # Formulario de crear/editar tareas
     ├─ TaskList.jsx       # Listado de tareas
     └─ TaskItem.jsx       # Componente individual de tarea
tailwind.config.js         # Configuración de Tailwind
postcss.config.js          # Configuración de PostCSS
```

---

## ✨ Funcionalidades

- ✅ Agregar nuevas tareas con título y descripción  
- ✅ Editar tareas existentes  
- ✅ Marcar tareas como completadas o pendientes  
- ✅ Eliminar tareas  
- ✅ Guardado automático en `localStorage`  
- ✅ Interfaz responsive con **TailwindCSS**  

---

## 📦 Dependencias principales

- **React 18**  
- **Vite** (bundler rápido)  
- **TailwindCSS** (estilos)  
- **uuid** (IDs únicos para las tareas)

---

## 👨‍💻 Autor

Proyecto de práctica desarrollado en **React** con Vite + Tailwind.
