# LocalFoto Web 📸

> **Tu Kiosco Fotográfico en el Bolsillo del Cliente.**

LocalFoto Web es una plataforma de software avanzada diseñada para laboratorios y locales de fotografía profesional. Permite a los clientes acceder a un sistema de edición profesional instantáneo directamente desde su smartphone o kiosco táctil, sin necesidad de cables ni aplicaciones externas.

## 🚀 Tecnologías Clave

Este proyecto utiliza un stack moderno para garantizar una experiencia de usuario fluida y de alto rendimiento:

- **React 19**: La última versión del core de React.
- **Vite**: Build tool ultrarrápida para desarrollo y producción.
- **Tailwind CSS v4**: Motor de estilos de última generación para un diseño premium y altamente personalizable.
- **Framer Motion**: Animaciones fluidas y transiciones orgánicas.
- **Lucide Icons**: Set de iconos vectoriales consistentes.
- **TypeScript**: Tipado estático para un desarrollo robusto.

## 🎨 Motores de Edición Pro

LocalFoto incluye 8 editores especializados que funcionan nativamente en el navegador:

1.  **Unitario**: Ajustes precisos de brillo, contraste, saturación y encuadre dinámico.
2.  **Collage**: Sistema de grillas dinámicas con slots inteligentes y detección de colisiones.
3.  **Photo Strips**: Tiras de 2x6" optimizadas para papel 6x8" en impresoras profesionales (DNP DS620A).
4.  **Calendarios**: Formatos mensuales y anuales con inyección automática de feriados nacionales.
5.  **Álbumes Pro**: Gestión completa de páginas, composiciones y personalización total del fotolibro.
6.  **Overlays**: Capas de diseño temáticas para marcos automáticos en eventos.
7.  **Spotify/QR**: Creación de placas musicales dinámicas y códigos QR con mensajes ocultos.
8.  **Photo Split**: Segmentación de imágenes en multipaneles decorativos con cálculo automático de precios.

## 💼 Funcionalidades Profesionales

### Identidad White Label Absoluta
El sistema detecta automáticamente la licencia por hardware (**HWID**) y adapta toda su identidad visual al negocio del cliente:
- Inyección de logotipos corporativos.
- Paleta de colores dinámica.
- Mensajes de bienvenida personalizados.
- Configuración de subdominios propios.

### Flujo Híbrido de Pagos
- **Checkout Digital**: Integración nativa con MercadoPago.
- **Pago en Caja**: Sistema Validador para confirmación manual (Efectivo/POS).

### Compatibilidad Industrial
Optimizado para hotfolders de hardware profesional:
- **FUJIFILM**: DX100, DE100.
- **DNP**: DS620A, DS820.

## 🛠️ Estructura del Proyecto

- `src/App.tsx`: Punto de entrada principal con gestión de temas y navegación de secciones.
- `src/MobileSimulationFlow.tsx`: Flujo interactivo de simulación para smartphones (Mockup móvil).
- `src/BrandWaves.tsx`: Componente decorativo de ondas dinámicas según el tema.
- `src/index.css`: Configuración de Tailwind v4 y variables de diseño CSS (@property).
- `public/`: Assets estáticos, incluyendo recursos para los editores.

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

---
© 2026 LocalFoto Software. Optimizado para Laboratorios Fotográficos Profesionales.
