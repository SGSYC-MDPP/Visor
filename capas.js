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
    {
    id: "COFOPRI",
    nombre: "COFOPRI",
    archivo: "data/COFOPRI.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#e29609", fillColor: "#f39d1279", weight: 1.2, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "COFOPRI",
      campos: [
        { campo: "AMBITO", etiqueta: "Nombre" },
        { campo: "SECTOR", etiqueta: "Sector" },
        { campo: "PARTIDA_R", etiqueta: "Partida Registral" },
      ]
        }
    },
    {
    id: "HAB_URBANA",
    nombre: "Habilitaciones Urbanas",
    archivo: "data/HAB_URBANA.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#00ff00", fillColor: "#2ecc407e", weight: 1.2, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Habilitación Urbana",
      campos: [
        { campo: "AMBITO", etiqueta: "Nombre" },
        { campo: "SECTOR", etiqueta: "Sector" },
        { campo: "PARTIDA_R", etiqueta: "Partida Registral" },
      ]
    }
  },
  {
    id: "ORD_038",
    nombre: "Ordenanza N.º038",
    archivo: "data/ORD_038.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#ffff00", fillColor: "#ffff007a", weight: 1.2, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Ordenanza N.°038",
      campos: [
        { campo: "AMBITO", etiqueta: "Nombre" },
        { campo: "SECTOR", etiqueta: "Sector" }
      ]
    }
  },
  {
    id: "PARCERLACION RUSTICA",
    nombre: "Parcelación Rustica",
    archivo: "data/AMBITOS_RUSTICOS.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#f806ec", fillColor: "#ff00f24b", weight: 1.2, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Parcelación Rustica",
      campos: [
        { campo: "NOMBRE", etiqueta: "Nombre" },
        { campo: "SECTOR", etiqueta: "Sector" }
      ]
    }
  }
  ]},
  { nombre: 'Manzanas', capas: [
    {
    id: "MZ Hab. Urbana",
    nombre: "Manzana - HU",
    archivo: "data/COFOPRI.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#e90808", fillColor: "#ff00f200", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Manzana HU",
      campos: [
        { campo: "MZ", etiqueta: "Manzana" },
        { campo: "SECTOR", etiqueta: "Sector" }  
      ]
        }
    },
    {
    id: "MZ COFOPRI",
    nombre: "Manzana - COFOPRI",
    archivo: "data/MZ_COFOPRI.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#0206fa", fillColor: "#ff00f200", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Manzana COFOPRI",
      campos: [
        { campo: "MZ", etiqueta: "Manzana" },
        { campo: "SECTOR", etiqueta: "Sector" }  
      ]
        }
    },
    {
    id: "MZ ORD 038",
    nombre: "Manzana - ORD 038",
    archivo: "data/MZ_ORD-038.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#ff08f3", fillColor: "#ff00f200", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Manzana Ordenanza N.°038",
      campos: [
        { campo: "MZ", etiqueta: "Manzana" },
        { campo: "SECTOR", etiqueta: "Sector" }  
      ]
        }
    }   
  ]},
  { nombre: 'Lotes', capas: [] },
  { nombre: 'Limites Administrativos', capas: [] },
  { nombre: 'Areas Reglamentarias', capas: [
    {
    id: "SITIO_ARQUEOLOGICO",
    nombre: "Sitios Arqueológicos",
    archivo: "data/SITIOS_ARQUEOLOGICOS.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#000000", fillColor: "#ff00f241", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Sitios Arqueológicos",
      campos: [
        { campo: "CATEGORIA", etiqueta: "Categoría" },
        { campo: "NOMBRE", etiqueta: "Denominación" }  
      ]
        }
    },
    {
    id: "Zona_riesgo_no_mitigable",
    nombre: "Zona de Riesgo No Mitigable",
    archivo: "data/ZONA_RIESGO_NO_MITIGABLE.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#f5eeee", fillColor: "#ff880063", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Zona de Riesgo No Mitigable",
      campos: [
        { campo: "NOMBRE", etiqueta: "Nombre" },
        { campo: "DESCRIPCIO", etiqueta: "Descripción" },
        { campo: "DECRETO", etiqueta: "Documento" }  
      ]
        }
    },
    {
    id: "Faja Marginal - Los Olivos",
    nombre: "Faja Marginal - Los Olivos",
    archivo: "data/FAJA_MARGINAL.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#0574f3", fillColor: "#00aeff8e", weight: 1.1, fillOpacity: 0.95, radius: 8 }
    },
    {
    id: "Area de Conservacion Regional",
    nombre: "Area de Conservacion Regional",
    archivo: "data/AREA_CONSERVACION.geojson",
    tipo: "poligono",
    visible: true,
    estilo: { color: "#2ceb06", fillColor: "#0bfd1756", weight: 1.1, fillOpacity: 0.95, radius: 8 },
    popup: {
      titulo: "Area de Conservacion Regional",
      campos: [
        { campo: "NOMBRE", etiqueta: "Nombre" }
        ]
        }
    }
  ] },
  { nombre: 'Vias', capas: [] },   // agrega capas aquí

];

// Campos que se muestran en el popup (si no existe, se muestran todos)
//const POPUP_CAMPOS = null; // ejemplo: ['nombre', 'area_m2']
