# Laboratorio de Claves 🔐

Una aplicación moderna y estética para generar contraseñas seguras, construida con React, Vite y Tailwind CSS. Presenta un diseño Neumórfico con detalles metálicos y soporte completo para modo oscuro.

## ✨ Características

*   **Diseño Neumórfico & Metálico**: Interfaz pulida y moderna con sombras suaves y texturas metálicas.
*   **Modo Oscuro / Claro**: Integración perfecta con el sistema de color preferido por el usuario.
*   **Personalización de Clave**:
    *   Control deslizante interactivo para ajustar la longitud (de 8 a 32 caracteres).
    *   Interruptores para incluir/excluir Letras (Aa), Números (0-9) y Símbolos (@!).
*   **Indicador de Seguridad en Tiempo Real**: Evalúa la fuerza de la contraseña (Débil, Media, Fuerte) basándose en la longitud y la variedad de caracteres.
*   **Copia con un clic**: Botón metálico para copiar la clave al portapapeles.
*   **Animaciones Fluidas**: Notificaciones emergentes animadas al copiar la contraseña, utilizando `motion/react`.

## 🛠️ Tecnologías Utilizadas

*   [React 19](https://react.dev/) - Biblioteca principal de UI.
*   [Vite](https://vitejs.dev/) - Entorno de desarrollo rápido.
*   [Tailwind CSS 4](https://tailwindcss.com/) - Framework de utilidades CSS para el diseño.
*   [Lucide React](https://lucide.dev/) - Iconografía moderna.
*   [Motion](https://motion.dev/) - Animaciones fluidas para la interfaz.

## 🚀 Instalación y Uso

1.  **Clonar o descargar el repositorio.**
2.  **Navegar al directorio del proyecto:**
    ```bash
    cd password-lab
    ```
3.  **Instalar las dependencias:**
    ```bash
    npm install
    ```
4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
5.  **Abrir en el navegador:**
    Visita `http://localhost:5173` (o el puerto indicado en la terminal) para ver la aplicación en funcionamiento.

## 📁 Estructura Principal

*   `src/App.jsx`: Componente principal que contiene la lógica de generación y la estructura de la interfaz.
*   `src/index.css`: Estilos globales, incluyendo la configuración de Tailwind, el fondo de cuadrícula tecnológica y las clases personalizadas para el diseño Neumórfico y Metálico.

---
*Laboratorio de Claves - Generador de contraseñas seguras y atractivas.*
