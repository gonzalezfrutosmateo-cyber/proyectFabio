# MatriculaSystem

Sistema web de gestión académica para el registro y administración de matrículas, alumnos, secretaría y carreras. Desarrollado con React y json-server como API REST local.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 19 (Create React App) |
| Enrutamiento | React Router DOM v7 |
| API / persistencia | json-server v1 (REST sobre `db.json`) |
| Íconos | react-icons (Font Awesome) |
| Estilos | CSS puro por componente |
| Procesos en paralelo | concurrently |

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación

```bash
# Clonar o descomprimir el proyecto y entrar a la carpeta
cd crud-matricula

# Instalar dependencias
npm install
```

---

## Arranque

```bash
npm start
npm run server
```

Este comando levanta **dos servidores en paralelo**:

| Servidor | URL | Descripción |
|---|---|---|
| React | http://localhost:3000 | Interfaz de usuario |
| json-server | http://localhost:3001 | API REST (lee y escribe `db.json`) |

> Los datos se persisten automáticamente en `db.json` al crear, editar o eliminar registros.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Solo el servidor de React |
| `npm run server` | Solo json-server (puerto 3001) |
| `npm run build` | Genera la build de producción |
| `npm test` | Ejecuta los tests |

---

## Estructura del proyecto

```
crud-matricula/
├── db.json                        # Base de datos json-server (única fuente de datos)
├── public/
└── src/
    ├── App.js                     # Raíz de la app, BrowserRouter y Routes
    ├── components/
    │   ├── Navbar.jsx / .css      # Barra de navegación fija con scroll-shadow
    │   ├── HeroSection.jsx / .css # Banner principal de la página de inicio
    │   ├── CategoryCards.jsx / .css # Tarjetas de acceso rápido
    │   ├── Footer.jsx / .css      # Pie de página con links de navegación
    │   ├── TablaGenerica.jsx / .css # Tabla reutilizable con acciones
    │   ├── Modal.jsx / .css       # Modal de formulario reutilizable (CRUD)
    │   ├── ReciboModal.jsx / .css # Modal de recibo de pago
    │   └── Toast.jsx / .css      # Notificación temporal de confirmación
    ├── hooks/
    │   └── useCRUD.js             # Hook genérico para operaciones REST (fetch)
    └── pages/
        ├── AlumnosPage.jsx        # CRUD de alumnos — /alumnos
        ├── SecretariaPage.jsx     # CRUD de secretaría — /secretaria
        ├── CarrerasPage.jsx       # CRUD de carreras — /carreras
        └── MatriculasPage.jsx     # CRUD de matrículas — /matriculas
```

---

## Modelo de datos (`db.json`)

### Alumnos — `/alumnos`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | number | Identificador único (auto json-server) |
| `codigo` | string | Código único del alumno (ej: ALU001) |
| `nombre` | string | Nombre del alumno |
| `apellido` | string | Apellido del alumno |
| `direccion` | string | Dirección postal |
| `telefono` | string | Teléfono en formato `xx-xxxx-xxxx` |

### Secretaría — `/secretarias`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | number | Identificador único |
| `codigo` | string | Código del personal (ej: SEC001) |
| `nombre` | string | Nombre |
| `apellido` | string | Apellido |
| `direccion` | string | Dirección postal |
| `telefono` | string | Teléfono en formato `xx-xxxx-xxxx` |

### Carreras — `/carreras`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | number | Identificador único |
| `codigo` | string | Código de carrera (ej: CAR001) |
| `nombre` | string | Nombre completo de la carrera |
| `arancel` | number | Costo de la matrícula en ARS |

### Matrículas — `/matriculas`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | number | Identificador único |
| `numero` | string | Número de matrícula (ej: MAT001) |
| `fecha` | string | Fecha de la matrícula (YYYY-MM-DD) |
| `codigoAlumno` | string | Referencia al código del alumno |
| `codigoSecretaria` | string | Referencia al código de la secretaria |
| `codigoCarrera` | string | Referencia al código de la carrera |
| `numeroRecibo` | string | Número del recibo de pago |
| `fechaRecibo` | string | Fecha del recibo (YYYY-MM-DD) |
| `total` | number | Total abonado (se calcula automáticamente desde el arancel) |
| `codigoConcepto` | string | Código del concepto de pago |

---

## Secciones del sistema

### `/` — Inicio
Página de presentación con hero, tarjetas de acceso rápido al CRUD y footer de navegación.

### `/alumnos`
Gestión completa de alumnos: listado con búsqueda en tiempo real, alta, baja y modificación. Validación de tipos por campo (solo letras en nombre/apellido, formato `xx-xxxx-xxxx` en teléfono, máx. 20 caracteres).

### `/secretaria`
Idéntica estructura a Alumnos, para el personal de secretaría.

### `/carreras`
Gestión de carreras académicas. Incluye el campo **Arancel** que alimenta automáticamente el total de cada matrícula nueva.

### `/matriculas`
Gestión de matrículas con funcionalidades adicionales:
- **Selects relacionados**: los campos de alumno, secretaria y carrera muestran desplegables con los registros reales en lugar de campos de texto libre.
- **Total automático**: al seleccionar una carrera, el campo Total se completa con su arancel (solo lectura).
- **Filtro de estado**: botones `Todas / Vigentes / Vencidas` según la fecha de la matrícula respecto al día de hoy.
- **Ver Recibo**: cada matrícula genera un recibo de pago con número, fecha, concepto y total.

---

## Componentes reutilizables

### `useCRUD(endpoint)`
Hook que encapsula todas las operaciones REST contra json-server.

```js
const { datos, agregar, editar, eliminar, loading } = useCRUD('/alumnos');
```

### `TablaGenerica`
```jsx
<TablaGenerica
  columnas={[{ key: 'nombre', label: 'Nombre' }]}
  datos={datos}
  onEditar={handleEditar}
  onEliminar={handleEliminar}
  accionesExtra={[{ label: 'Ver', onClick: fn, className: 'btn-recibo' }]}
/>
```

### `Modal`
Soporta los tipos de campo: `text`, `name`, `code`, `address`, `phone`, `date`, `number`, `select`, `readonly`.

```jsx
<Modal
  isOpen={modalAbierto}
  onClose={() => setModalAbierto(false)}
  onGuardar={handleGuardar}
  titulo="Agregar Alumno"
  campos={campos}
  datosIniciales={itemEditando}
  calcularCampos={fn} // opcional: auto-rellena campos según otros
/>
```

### `Toast`
```jsx
<Toast mensaje="✅ Guardado" visible={visible} onOcultar={ocultarFn} />
```

---

## Paleta de colores

| Variable | Hex | Uso |
|---|---|---|
| Azul oscuro | `#1a1a2e` | Fondo navbar, tarjetas, footer, header de tablas |
| Azul claro | `#4a9eff` | Acentos, botones primarios, divisores |
| Verde | `#38a169` | Toast de éxito, botón Ver Recibo |
| Rojo | `#e53e3e` | Botón Eliminar, errores de validación |
| Gris claro | `#f5f5f5` | Fondo de páginas |
| Blanco | `#ffffff` | Texto sobre fondos oscuros, cards |

---

## Validaciones de formulario

Cada campo en los modales tiene un tipo estricto:

| Tipo | Regla |
|---|---|
| `name` | Solo letras, espacios, guiones y acentos |
| `code` | Solo letras y números, sin espacios ni símbolos |
| `address` | Letras, números y puntuación básica (`.,#-/`) |
| `phone` | Exactamente `xx-xxxx-xxxx` |
| `number` | Número positivo válido |
| `date` | Fecha válida seleccionada por el navegador |
| `select` | Debe seleccionar una opción de la lista |
| `readonly` | Calculado automáticamente, no editable |

Todos los campos de texto tienen un máximo de 20 caracteres. Los errores se muestran en tiempo real al salir de cada campo y al intentar guardar.
