# Glam Nails Studio - Sistema de Gestión de Citas

## Descripción del Proyecto

Aplicación web Full Stack desarrollada para la administración y gestión de citas de un salón de belleza. El proyecto se enfoca en proporcionar una interfaz de usuario limpia, elegante y responsive, manteniendo el rendimiento gracias al uso de JavaScript Vanilla.

**Estética:** La interfaz utiliza una paleta de colores sofisticada y tipografía moderna, con transiciones CSS suaves para mejorar la experiencia de usuario.

---

## Funcionalidades Principales

El sistema implementa una gestión completa de las citas (CRUD - Create, Read, Update, Delete):

* **Crear (C):** Agendar nuevas citas.
* **Leer (R):** Visualizar la agenda completa en tiempo real.
* **Actualizar (U):** Editar citas existentes.
* **Eliminar (D):** Cancelar citas programadas.
* **Interfaz:** Diseño responsivo, con animaciones de entrada y carga de datos.

---

## Tecnologías Utilizadas

| Componente | Tecnología | Módulos Clave |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express | Mongoose, CORS, Dotenv |
| **Base de Datos** | MongoDB (Atlas) | Mongoose ODM |
| **Frontend** | JavaScript Vanilla | Fetch API |
| **Diseño** | HTML5, CSS3 | Bootstrap 5 |

---

## 🚀 Guía de Instalación Rápida

Esta sección asume que Node.js y Git están correctamente instalados en el sistema.

### 1. Clonación e Instalación de Dependencias

1.  Clonar el repositorio y entrar a la carpeta del backend:
    ```bash
    git clone [https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories](https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories)
    cd [nombre-del-proyecto]/backend
    ```
2.  Instalar las dependencias de Node.js:
    ```bash
    npm install
    ```

### 2. Configuración del Entorno

1.  Cree un archivo llamado **`.env`** en la carpeta `backend`.
2.  Pegue y configure sus variables de entorno. El puerto debe coincidir con el valor en el Frontend.
    ```env
    PORT=3000
    MONGO_URI=TU_CADENA_DE_CONEXION_MONGODB_ATLAS
    ```

### 3. Ejecución del Proyecto

1.  **Iniciar el Backend:**
    ```bash
    node server.js
    ```
    El servidor confirmará la conexión a MongoDB y la ejecución en el puerto 3000.

2.  **Abrir el Frontend:**
    Navegue a la carpeta `frontend` y abra el archivo `index.html` en cualquier navegador web.# Examen
