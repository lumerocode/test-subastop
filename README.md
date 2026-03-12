
# 📦 AdminPanel - Inventory Management Pro

Sistema de Gestión de inventario desarrollado para el reto técnico. Permite administrar productos con una experiencia de usuario fluida, optimización de estados y persistencia de datos.

---

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/lumerocode/test-subastop.git
    cd test-subastop
    ```
2. **Instalar dependencias:**
    ```bash
    npm install
    ```
3. **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```

---

## 🏗️ Arquitectura: Feature-Oriented Design

- **src/features/**: Es el main stage de la aplicación. Cada carpeta (auth, inventory, dashboard) contiene su propia lógica de negocio, componentes, slices de Redux y servicios de API (RTK Query).
- **src/store/**: Configuración centralizada de Redux Toolkit.
- **src/components/layout/**: Componentes globales reutilizables (Sidebar, Navbar).

> **Nota:** Si la aplicación crece (por ejemplo, añadiendo un módulo de "Ventas"), solo se debe crear una nueva carpeta en features con su lógica aislada.

---

## 🏗️ Arquitectura: Feature-Oriented Design

- **Optimistic Updates:** Las ediciones de productos se reflejan instantáneamente en la UI antes de recibir confirmación del servidor, con rollback automático en caso de error.
- **Persistencia de Estado:** Sincronización de filtros y vistas mediante URL Search Params, permitiendo que el estado sobreviva a recargas de página (F5).
- **Custom Middleware:**  Implementación de un errorMiddleware global para interceptar fallos de red y disparar notificaciones centralizadas.

---

## 🧠 AI Disclosure

En el desarrollo de este proyecto se adoptó un enfoque de IA-Augmented Development, utilizando herramientas como Gemini para optimizar el flujo de trabajo y acelerar la creación de estructuras base.

### 🤖 Uso de Herramientas de IA

- **Generación de Boilerplate:** Creación de estructuras iniciales de componentes de UI y estilos base utilizando Tailwind CSS v4.
- **Esquemas de Lógica:** Generación de esqueletos para mutaciones de RTK Query y propuestas iniciales de tipos en TypeScript.

### 🛠️ Intervención y Corrección Manual

- **Arquitectura de Navegación:** Refactorización manual de la lógica de navegación, uso personalizado de useSearchParams y Suspense para persistencia de estado tras recargas.
- **Tipado Estricto y Genéricos:** Definición manual de interfaces y tipos genéricos para todas las respuestas de la API y estados del store. Me aseguré de eliminar cualquier uso de any para garantizar la integridad de los datos y la robustez del código.
- **Refactorización CSS v4:** Ajuste manual del bloque @theme de Tailwind v4 y centralización de estilos.
- **Optimización de Caché:** Desarrollo manual de providesTags e invalidatesTags de RTK Query para sincronización.
- **Middleware de Errores:** Desarrollo manual de lógica para interceptar errores de red y personalización de mensajes mediante Sonner.

---

## 📝 Conclusión

La IA permitió agilizar tareas repetitivas, permitiendo enfocar el esfuerzo manual en la arquitectura, la UX y la robustez del estado global.

