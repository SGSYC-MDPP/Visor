// ====== CONFIGURACIÓN: edita aquí las capas, colores y archivos ======
const CENTRO = [-11.865, -77.075];   // Puente Piedra (ajusta a tu distrito)
const ZOOM = 13;

const MAPAS_BASE = [
  { id: 'sat', nombre: 'Satélite (Esri)', activo: true,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attr: 'Imágenes © Esri' },
  { id: 'osm', nombre: 'Calles (OpenStreetMap)',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '© OpenStreetMap' }
];

// Los grupos de capas y los campos del popup se editan en capas.js

// ====== MAPA ======
const mapa = L.map('mapa', { zoomControl: false }).setView(CENTRO, ZOOM);
L.control.zoom({ position: 'topright' }).addTo(mapa);
L.control.scale({ metric: true, imperial: false }).addTo(mapa);

const bases = {};
MAPAS_BASE.forEach(b => {
  bases[b.id] = L.tileLayer(b.url, { attribution: b.attr, maxZoom: 19 });
  if (b.activo) bases[b.id].addTo(mapa);
});

// ====== CAPAS ======
const capas = {};   // id -> L.GeoJSON

function popupHtml(props) {
  const claves = POPUP_CAMPOS || Object.keys(props || {});
  if (!claves.length) return 'Sin atributos';
  return '<table>' + claves.map(k => `<tr><th>${k}</th><td>${props[k] ?? ''}</td></tr>`).join('') + '</table>';
}

async function cargarCapa(def) {
  try {
    const datos = await (await fetch(def.archivo)).json();
    capas[def.id] = L.geoJSON(datos, {
      style: { color: def.color, weight: 2, fillColor: def.color, fillOpacity: 0.35 },
      pointToLayer: (f, ll) => L.circleMarker(ll, { radius: 6, color: def.color, fillOpacity: 0.7 }),
      onEachFeature: (f, l) => l.bindPopup(popupHtml(f.properties))
    });
    return true;
  } catch (e) {
    console.warn('No se pudo cargar', def.archivo, e);
    return false;
  }
}

// ====== PANEL ======
const cont = document.getElementById('panel-contenido');

function plegable(titulo, cuerpo, abierto, extraCab) {
  const g = document.createElement('div');
  g.className = 'grupo' + (abierto ? '' : ' cerrado');
  g.innerHTML = `<div class="grupo-cab"><button class="plegar" type="button">${abierto ? '−' : '+'}</button><span class="nombre">${titulo}</span></div><div class="grupo-cuerpo"></div>`;
  const cab = g.querySelector('.grupo-cab');
  if (extraCab) cab.appendChild(extraCab);
  g.querySelector('.grupo-cuerpo').appendChild(cuerpo);
  g.querySelector('.plegar').onclick = e => {
    const cerrado = g.classList.toggle('cerrado');
    e.target.textContent = cerrado ? '+' : '−';
  };
  return g;
}

// Mapas base (radio)
const cuerpoBase = document.createElement('div');
MAPAS_BASE.forEach(b => {
  const f = document.createElement('label');
  f.className = 'capa';
  f.innerHTML = `<input type="radio" name="base" ${b.activo ? 'checked' : ''}><span class="nombre">${b.nombre}</span>`;
  f.querySelector('input').onchange = () => {
    Object.values(bases).forEach(l => mapa.removeLayer(l));
    bases[b.id].addTo(mapa).bringToBack();
  };
  cuerpoBase.appendChild(f);
});
cont.appendChild(plegable('Mapa base', cuerpoBase, false));

// Grupos de capas
GRUPOS.forEach(grupo => {
  const cuerpo = document.createElement('div');
  const checks = [];

  grupo.capas.forEach(def => {
    const fila = document.createElement('div');
    fila.className = 'capa';
    fila.innerHTML = `<input type="checkbox" aria-label="${def.nombre}"><span class="muestra" style="background:${def.color}"></span><span class="nombre">${def.nombre}</span><button class="acercar" type="button">Acercar</button>`;
    const chk = fila.querySelector('input');
    checks.push(chk);

    chk.onchange = async () => {
      if (chk.checked) {
        if (!capas[def.id] && !(await cargarCapa(def))) { chk.checked = false; return; }
        capas[def.id].addTo(mapa);
      } else if (capas[def.id]) {
        mapa.removeLayer(capas[def.id]);
      }
      actualizarGrupo();
    };
    fila.querySelector('.acercar').onclick = async () => {
      if (!capas[def.id] && !(await cargarCapa(def))) return;
      const b = capas[def.id].getBounds();
      if (b.isValid()) mapa.fitBounds(b, { padding: [30, 30] });
    };
    cuerpo.appendChild(fila);
  });

  // Casilla del grupo: activa/desactiva todas sus capas
  const chkGrupo = document.createElement('input');
  chkGrupo.type = 'checkbox';
  chkGrupo.setAttribute('aria-label', grupo.nombre);
  chkGrupo.onchange = () => checks.forEach(c => { if (c.checked !== chkGrupo.checked) { c.checked = chkGrupo.checked; c.onchange(); } });
  function actualizarGrupo() { chkGrupo.checked = checks.length > 0 && checks.every(c => c.checked); }

  cont.appendChild(plegable(grupo.nombre, cuerpo, false, chkGrupo));
});

// Panel en celular
document.getElementById('btn-panel').onclick = () => document.getElementById('panel').classList.toggle('oculto');
if (window.innerWidth <= 640) document.getElementById('panel').classList.add('oculto');

// Botón superior derecho: personaliza su acción aquí
document.getElementById('btn-extra').onclick = () => alert('Botón de ejemplo');
