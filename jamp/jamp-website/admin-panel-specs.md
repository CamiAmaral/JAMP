# 🛠️ Panel de Administración JAMP - Especificaciones Técnicas

## 📋 Descripción General

Panel de administración web para que Pablo Amaral pueda gestionar clientes, servicios, stock y movimientos económicos de JAMP de manera eficiente y sin conocimientos técnicos avanzados.

## 🎯 Objetivos del Panel

- **Gestión de Clientes**: Registro, consulta y actualización de información
- **Control de Servicios**: Seguimiento de trabajos realizados
- **Administración de Stock**: Control de productos y materiales
- **Reportes Financieros**: Ingresos, gastos y análisis mensual
- **Autenticación Segura**: Acceso controlado con roles y permisos

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Node.js + Express.js (alternativa: PHP + Laravel)
- **Base de Datos**: MySQL 8.0
- **Autenticación**: JWT (JSON Web Tokens)
- **Hosting**: VPS con Debian 12

### Estructura de Base de Datos

```sql
-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('owner', 'admin', 'tecnico') DEFAULT 'tecnico',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL
);

-- Tabla de Clientes
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    ciudad VARCHAR(50) DEFAULT 'Montevideo',
    notas TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Servicios
CREATE TABLE servicios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    tipo_servicio ENUM('wifi', 'mantenimiento', 'reparacion', 'remoto', 'otro') NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_servicio DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    tecnico_asignado INT,
    estado ENUM('pendiente', 'en_proceso', 'completado', 'cancelado') DEFAULT 'pendiente',
    observaciones TEXT,
    precio DECIMAL(10,2),
    costo_materiales DECIMAL(10,2) DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (tecnico_asignado) REFERENCES usuarios(id)
);

-- Tabla de Productos/Stock
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    stock_actual INT DEFAULT 0,
    stock_minimo INT DEFAULT 0,
    precio_compra DECIMAL(10,2),
    precio_venta DECIMAL(10,2),
    proveedor VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Movimientos de Stock
CREATE TABLE movimientos_stock (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    tipo_movimiento ENUM('ingreso', 'egreso', 'ajuste') NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(200),
    servicio_id INT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Movimientos Económicos
CREATE TABLE movimientos_economicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_movimiento ENUM('ingreso', 'egreso') NOT NULL,
    concepto VARCHAR(200) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    servicio_id INT NULL,
    fecha_movimiento DATE NOT NULL,
    descripcion TEXT,
    usuario_id INT NOT NULL,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

## 🖥️ Pantallas del Panel

### 1. Dashboard Principal
**URL**: `/admin/dashboard`

**Elementos**:
- Resumen del mes actual
- Gráfico de servicios por tipo
- Ingresos vs gastos
- Clientes nuevos
- Servicios pendientes
- Stock bajo (alertas)
- Tareas del día

**Métricas**:
- Servicios completados este mes
- Ingresos totales
- Clientes atendidos
- Productos con stock bajo

### 2. Gestión de Clientes
**URL**: `/admin/clientes`

**Funcionalidades**:
- Lista de clientes con filtros
- Búsqueda por nombre, teléfono, email
- Formulario agregar/editar cliente
- Historial de servicios por cliente
- Exportar lista a Excel/PDF

**Campos del formulario**:
- Nombre y apellido
- Teléfono
- Email
- Dirección
- Notas adicionales

### 3. Gestión de Servicios
**URL**: `/admin/servicios`

**Funcionalidades**:
- Lista de servicios con filtros
- Estados: Pendiente, En proceso, Completado, Cancelado
- Asignación de técnicos
- Formulario crear/editar servicio
- Seguimiento de tiempo
- Cálculo automático de precios

**Campos del formulario**:
- Cliente (búsqueda/selector)
- Tipo de servicio
- Descripción detallada
- Fecha y hora
- Técnico asignado
- Precio
- Observaciones

### 4. Control de Stock
**URL**: `/admin/stock`

**Funcionalidades**:
- Lista de productos
- Movimientos de entrada/salida
- Alertas de stock bajo
- Formulario agregar/editar producto
- Historial de movimientos
- Reporte de inventario

**Campos del formulario**:
- Nombre del producto
- Descripción
- Categoría
- Stock actual
- Stock mínimo
- Precio de compra/venta
- Proveedor

### 5. Reportes Financieros
**URL**: `/admin/reportes`

**Tipos de reportes**:
- Ingresos mensuales
- Gastos por categoría
- Servicios más rentables
- Análisis de clientes
- Flujo de caja
- Exportar a PDF/Excel

**Filtros disponibles**:
- Rango de fechas
- Tipo de servicio
- Técnico
- Cliente

### 6. Gestión de Usuarios
**URL**: `/admin/usuarios`

**Funcionalidades**:
- Lista de usuarios
- Crear/editar usuarios
- Asignar roles y permisos
- Activar/desactivar usuarios
- Historial de accesos

## 🔐 Sistema de Autenticación

### Roles y Permisos

**Owner (Pablo)**:
- Acceso completo a todas las funciones
- Gestión de usuarios
- Configuración del sistema
- Reportes financieros completos

**Admin**:
- Gestión de clientes y servicios
- Control de stock
- Reportes básicos
- No puede gestionar usuarios

**Técnico**:
- Ver servicios asignados
- Actualizar estado de servicios
- Registrar tiempo trabajado
- No acceso a reportes financieros

### Autenticación JWT
```javascript
// Estructura del token
{
  "userId": 1,
  "username": "pablo",
  "rol": "owner",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 🔌 API Endpoints

### Autenticación
```
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/refresh
```

### Clientes
```
GET    /api/clientes
POST   /api/clientes
GET    /api/clientes/:id
PUT    /api/clientes/:id
DELETE /api/clientes/:id
GET    /api/clientes/:id/servicios
```

### Servicios
```
GET    /api/servicios
POST   /api/servicios
GET    /api/servicios/:id
PUT    /api/servicios/:id
DELETE /api/servicios/:id
PUT    /api/servicios/:id/estado
```

### Stock
```
GET    /api/productos
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
POST   /api/productos/:id/movimiento
GET    /api/movimientos-stock
```

### Reportes
```
GET /api/reportes/ingresos?fecha_inicio=&fecha_fin=
GET /api/reportes/servicios?mes=&año=
GET /api/reportes/stock-bajo
GET /api/reportes/dashboard
```

## 📱 Diseño Responsivo

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Características Móviles
- Navegación con menú hamburguesa
- Formularios optimizados para touch
- Tablas con scroll horizontal
- Botones de tamaño adecuado

## 🔒 Seguridad

### Medidas Implementadas
- **HTTPS**: Certificado SSL obligatorio
- **Autenticación**: JWT con expiración
- **Validación**: Sanitización de inputs
- **Rate Limiting**: Límite de requests
- **Backup**: Automático diario
- **Logs**: Registro de actividades

### Configuración de Seguridad
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});

// CORS
app.use(cors({
  origin: ['https://jamp.com.uy'],
  credentials: true
}));
```

## 📊 Integraciones

### WhatsApp Business API
- Envío de notificaciones automáticas
- Confirmación de citas
- Recordatorios de servicios
- Respuestas automáticas

### Email SMTP
- Notificaciones de nuevos servicios
- Reportes automáticos
- Confirmaciones de pago
- Recordatorios de stock bajo

### Google Analytics
- Tracking de uso del panel
- Métricas de performance
- Análisis de comportamiento
- Reportes de errores

## 🚀 Plan de Implementación

### Fase 1 - MVP (4 semanas)
- [ ] Autenticación básica
- [ ] CRUD de clientes
- [ ] CRUD de servicios
- [ ] Dashboard básico
- [ ] Reportes simples

### Fase 2 - Funcionalidades Avanzadas (3 semanas)
- [ ] Control de stock completo
- [ ] Reportes financieros
- [ ] Integración WhatsApp
- [ ] Exportación de datos
- [ ] Notificaciones

### Fase 3 - Optimizaciones (2 semanas)
- [ ] Performance optimization
- [ ] Mobile app básica
- [ ] Integraciones avanzadas
- [ ] Analytics y métricas
- [ ] Backup automático

## 📋 Checklist de Entrega

### Funcionalidades Core
- [ ] Login/logout funcional
- [ ] Gestión completa de clientes
- [ ] Gestión completa de servicios
- [ ] Control básico de stock
- [ ] Reportes mensuales
- [ ] Dashboard con métricas

### Seguridad
- [ ] HTTPS configurado
- [ ] Autenticación JWT
- [ ] Validación de inputs
- [ ] Backup automático
- [ ] Logs de seguridad

### Usabilidad
- [ ] Interfaz intuitiva
- [ ] Responsive design
- [ ] Formularios validados
- [ ] Mensajes de error claros
- [ ] Confirmaciones de acciones

### Documentación
- [ ] Manual de usuario (1 página)
- [ ] Documentación técnica
- [ ] Guía de instalación
- [ ] Troubleshooting básico

## 🎓 Capacitación del Usuario

### Sesión de Capacitación (2 horas)
1. **Acceso al panel** (15 min)
   - Login y logout
   - Navegación básica
   - Cambio de contraseña

2. **Gestión de clientes** (30 min)
   - Agregar nuevo cliente
   - Buscar y editar cliente
   - Ver historial de servicios

3. **Gestión de servicios** (45 min)
   - Crear nuevo servicio
   - Asignar técnico
   - Actualizar estado
   - Registrar observaciones

4. **Control de stock** (20 min)
   - Agregar productos
   - Registrar movimientos
   - Ver alertas de stock bajo

5. **Reportes** (10 min)
   - Generar reporte mensual
   - Exportar a PDF/Excel
   - Interpretar métricas

### Manual de Usuario (1 página)
- Acceso rápido a funciones principales
- Atajos de teclado
- Solución de problemas comunes
- Contacto de soporte técnico

---

**Panel de administración diseñado para ser intuitivo y eficiente, permitiendo a Pablo gestionar JAMP sin conocimientos técnicos avanzados.**
