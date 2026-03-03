# LocalFoto Web - Landing Page 🌐

> **La vitrina digital y simulador interactivo del ecosistema LocalFoto.**

Este repositorio contiene el código fuente de la **Landing Page** oficial de LocalFoto. No es el software de kiosco (Hotfolder), sino la plataforma web comercial diseñada para presentar el servicio a dueños de laboratorios fotográficos y permitirles experimentar con el flujo de trabajo a través de simuladores interactivos.

## ✨ Propósito del Proyecto

El objetivo principal de esta web es convertir visitantes en clientes mediante una presentación premium y visualmente impactante de las capacidades tecnológicas de LocalFoto:

- **Showcase de Editores**: Presentación interactiva de los 8 motores de edición profesional.
- **Simulador Móvil**: Un componente avanzado (`MobileSimulationFlow`) que emula la experiencia del cliente final en su smartphone.
- **Presentación White Label**: Demostración dinámica de cómo el sistema se adapta a la identidad visual de cualquier negocio.
- **Conversión**: Formulario de contacto inteligente con selección de planes y modelos de hardware.

## 🚀 Stack Tecnológico

Desarrollado con las tecnologías web más modernas para garantizar velocidad y una estética de vanguardia:

- **React 19**: Frontend reactivo y eficiente.
- **Vite**: Entorno de desarrollo y build ultrarrápido.
- **Tailwind CSS v4**: Estilos premium utilizando las últimas capacidades del motor CSS.
- **Framer Motion**: Micro-interacciones y transiciones orgánicas que elevan la percepción de calidad.
- **Lucide Icons**: Iconografía simplificada y profesional.

## 🛠️ Componentes Clave

- `src/App.tsx`: Orquestador principal de la Landing Page, secciones de marketing y gestión de temas dinámicos.
- `src/MobileSimulationFlow.tsx`: **Módulo Crítico**. Emula la interfaz que el cliente final utiliza en su teléfono para subir y editar fotos.
- `src/BrandWaves.tsx`: Generador de ondas estéticas que se adaptan cromáticamente al tema seleccionado.
- `src/index.css`: Implementación de variables de diseño avanzadas (@property) y tokens de Tailwind v4.

## 💻 Guía de Desarrollo

Este proyecto es una aplicación web estática (SPA) optimizada para despliegue rápido.

```bash
# Instalación de dependencias
npm install

# Servidor de desarrollo con HMR
npm run dev

# Generación del bundle de producción (dist/)
npm run build
```

---
© 2026 LocalFoto Software. Este sitio es una herramienta de ventas y simulación. Para el software de impresión (Hotfolder), consulta la documentación interna del servidor de licencias.
