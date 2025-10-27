# Assets - JAMP Sitio Web

Esta carpeta contiene todos los recursos visuales necesarios para el sitio web de JAMP.

## 📁 Estructura de Carpetas

```
assets/
├── images/
│   ├── hero/
│   ├── services/
│   ├── testimonials/
│   └── gallery/
├── icons/
├── logo/
└── favicon/
```

## 🖼️ Imágenes Requeridas

### Hero Section
- **hero-technician.jpg** (1920x1080px)
  - Técnico trabajando con equipos
  - Formato: JPG optimizado
  - Peso máximo: 500KB

### Servicios
- **wifi-optimization.jpg** (800x600px)
  - Router/antenas/equipos de red
- **pc-maintenance.jpg** (800x600px)
  - PC abierta mostrando componentes
- **remote-support.jpg** (800x600px)
  - Pantalla con conexión remota

### Galería de Trabajos
- **gallery-01.jpg** a **gallery-12.jpg** (600x400px)
  - Fotos de trabajos realizados
  - Categorías: WiFi, Hardware, Software
  - Formato: JPG optimizado

### Testimonios
- **client-01.jpg** a **client-03.jpg** (200x200px)
  - Fotos de clientes (opcional)
  - Formato: JPG, circular

## 🎨 Logo y Branding

### Logo Principal
- **logo-jamp.svg** (vectorial)
- **logo-jamp.png** (múltiples tamaños)
  - 32x32px (favicon)
  - 64x64px (navbar)
  - 128x128px (footer)
  - 256x256px (alta resolución)

### Favicon
- **favicon.ico** (32x32px)
- **favicon-16x16.png**
- **favicon-32x32.png**
- **apple-touch-icon.png** (180x180px)

## 🎯 Especificaciones Técnicas

### Formatos Recomendados
- **WebP** para imágenes (con fallback JPG)
- **SVG** para iconos y logo
- **PNG** para imágenes con transparencia

### Optimización
- Comprimir imágenes con herramientas como:
  - TinyPNG
  - ImageOptim
  - Squoosh.app

### Naming Convention
- Usar guiones para separar palabras
- Incluir dimensión en el nombre si es necesario
- Ejemplo: `hero-technician-1920x1080.jpg`

## 📱 Responsive Images

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Sizes Attribute
```html
<img src="image.jpg" 
     srcset="image-320.jpg 320w,
             image-768.jpg 768w,
             image-1024.jpg 1024w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     alt="Descripción">
```

## 🎨 Paleta de Colores

### Colores Principales
- **Negro**: #000000
- **Blanco**: #FFFFFF
- **Gris Oscuro**: #333333
- **Gris Medio**: #6C757D
- **Gris Claro**: #F8F9FA
- **WhatsApp Verde**: #25D366

### Uso en Assets
- Logo: Negro sobre blanco
- Iconos: Negro o blanco según fondo
- Imágenes: Preferir tonos neutros

## 📋 Checklist de Assets

### Imágenes Principales
- [ ] Hero image (técnico trabajando)
- [ ] 3 imágenes de servicios
- [ ] 12 imágenes de galería
- [ ] 3 fotos de testimonios (opcional)

### Logo y Branding
- [ ] Logo en SVG
- [ ] Logo en PNG (múltiples tamaños)
- [ ] Favicon completo
- [ ] Apple touch icon

### Optimización
- [ ] Todas las imágenes comprimidas
- [ ] Formatos WebP generados
- [ ] Alt text descriptivo
- [ ] Lazy loading implementado

## 🔧 Herramientas Recomendadas

### Edición de Imágenes
- **Adobe Photoshop** (profesional)
- **GIMP** (gratuito)
- **Canva** (online, fácil)

### Optimización
- **TinyPNG** (compresión)
- **Squoosh** (Google, online)
- **ImageOptim** (Mac)

### Generación de Favicon
- **Favicon.io** (online)
- **RealFaviconGenerator** (completo)

## 📝 Notas Importantes

1. **Derechos de autor**: Asegurar que todas las imágenes tengan los derechos necesarios
2. **Calidad**: Mantener alta calidad visual pero optimizar para web
3. **Accesibilidad**: Incluir alt text descriptivo en todas las imágenes
4. **Backup**: Mantener copias de alta resolución de todos los assets
5. **Actualización**: Revisar y actualizar imágenes periódicamente

## 🚀 Implementación

Una vez que tengas todas las imágenes, reemplaza las rutas en el HTML:

```html
<!-- Cambiar de: -->
<img src="../assets/hero-technician.jpg" alt="Técnico trabajando">

<!-- A: -->
<img src="../assets/images/hero/hero-technician.jpg" alt="Técnico trabajando">
```

Y actualiza las rutas en el CSS si es necesario.
