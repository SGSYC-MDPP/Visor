// ====== CAPAS DEL GEOVISOR ======
// Edita este archivo para agregar, quitar o renombrar capas.
// - nombre:  texto que se ve en el panel
// - archivo: ruta del GeoJSON dentro de la carpeta data/
// - color:   color del relleno, el borde y la muestra del panel (hex)
// - id:      identificador único, sin espacios ni tildes
// Para una capa nueva, copia una línea existente y cambia sus valores.
// Para un grupo nuevo, copia un bloque { nombre: ..., capas: [...] }.

// Cada grupo tiene capas; cada capa apunta a un GeoJSON en /data
const GRUPOS = [
  { nombre: 'Ámbitos Urbanos', capas: [
    { id: 'cofopri', nombre: 'COFOPRI', archivo: 'data/COFOPRI.geojson', color: '#f39d1279' },
    { id: 'hab_urbana', nombre: 'Habilitación Urbana', archivo: 'data/HAB_URBANA.geojson', color: '#2ecc407e' },
    { id: 'Ord_038', nombre: 'Ordenanza N.°038', archivo: 'data/ORD_038.geojson', color: '#d3e91077' }
  ]},
  { nombre: 'Equipamiento', capas: [
    { id: 'parques', nombre: 'Parques y áreas verdes', archivo: 'data/parques.geojson', color: '#2e8b57' }
  ]},
  { nombre: 'Espacios públicos', capas: [] }   // agrega capas aquí
];

// Campos que se muestran en el popup (si no existe, se muestran todos)
const POPUP_CAMPOS = null; // ejemplo: ['nombre', 'area_m2']
