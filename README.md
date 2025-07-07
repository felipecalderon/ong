# Plataforma de Denuncia Animal y Medioambiental

Esta es una plataforma web de código abierto diseñada para que los ciudadanos puedan registrar, visibilizar y dar seguimiento a denuncias sobre maltrato animal y delitos contra el medioambiente. El objetivo es crear una comunidad activa y centralizar la información para facilitar la acción por parte de organizaciones y autoridades competentes.

## ✨ Características Principales

-   **🔐 Autenticación de Usuarios**: Sistema de registro e inicio de sesión seguro usando NextAuth.js, con soporte para credenciales (email/contraseña) y proveedores sociales (Google, etc.).
-   **📝 Creación de Denuncias (Posts)**: Los usuarios pueden crear denuncias detalladas utilizando un editor Markdown integrado.
-   **🖼️ Soporte Multimedia**: Posibilidad de adjuntar imágenes y otros archivos a las denuncias para aportar evidencia.
-   **💬 Interfaz Moderna y Responsiva**: Diseño limpio y adaptable a cualquier dispositivo (móvil, tablet, escritorio) construido con Tailwind CSS y Shadcn/UI.
-   **🔍 Visualización de Casos**: Mapa interactivo y listado de denuncias para explorar los casos reportados.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **Base de Datos**: [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/)
-   **Autenticación**: [NextAuth.js](https://next-auth.js.org/)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
-   **Componentes UI**: [Shadcn/UI](https.ui.shadcn.com/)
-   **Gestión de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🏁 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto corriendo en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

-   [Node.js](https://nodejs.org/en/) (v18 o superior)
-   [pnpm](https://pnpm.io/installation)
-   Una instancia de [MongoDB](https://www.mongodb.com/try/download/community) (local o en la nube a través de Atlas).

### Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. **Instala las dependencias:**

    ```bash
    pnpm install
    ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto copiando el ejemplo (si existe) o creándolo desde cero.

    ```bash
    touch .env.local
    ```

    Añade las siguientes variables:

    ```env
    # URL de conexión a tu base de datos MongoDB
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

    # Variables de NextAuth.js
    # Genera un secret con: openssl rand -base64 32
    NEXTAUTH_SECRET=tu-secret-aqui
    NEXTAUTH_URL=http://localhost:3000

    # Credenciales de proveedores OAuth (ej. Google)
    GOOGLE_CLIENT_ID=tu-client-id-de-google
    GOOGLE_CLIENT_SECRET=tu-client-secret-de-google
    ```

4. **Inicia el servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 📂 Estructura del Proyecto

```
/src
├───actions/        # Lógica de servidor (Server Actions) para mutaciones de datos.
├───app/            # Rutas, páginas y layouts de la aplicación (App Router).
│   ├───api/        # Rutas de API para autenticación y otros endpoints.
│   └───(posts)/    # Grupo de rutas para la gestión de posts/denuncias.
├───components/     # Componentes de React reutilizables.
│   ├───ui/         # Componentes base de Shadcn/UI.
│   └───...
├───database/       # Configuración de la conexión a MongoDB y modelos de datos.
│   └───models/     # Esquemas de Mongoose para las colecciones.
├───hooks/          # Hooks de React personalizados.
├───interfaces/     # Definiciones de tipos y interfaces de TypeScript.
├───lib/            # Funciones de utilidad y helpers.
├───providers/      # Proveedores de contexto de React (ej. AuthProvider).
└───stores/         # Stores de Zustand para la gestión de estado global.
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el proyecto, por favor haz un fork del repositorio y crea un Pull Request.

1. Haz un Fork del proyecto.
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4. Haz Push a la Branch (`git push origin feature/AmazingFeature`).
5. Abre un Pull Request.

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.
