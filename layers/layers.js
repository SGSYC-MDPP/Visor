var wms_layers = [];

var format_HAB_URBANA_py_0 = new ol.format.GeoJSON();
var features_HAB_URBANA_py_0 = format_HAB_URBANA_py_0.readFeatures(json_HAB_URBANA_py_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_HAB_URBANA_py_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_HAB_URBANA_py_0.addFeatures(features_HAB_URBANA_py_0);
var lyr_HAB_URBANA_py_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_HAB_URBANA_py_0, 
                style: style_HAB_URBANA_py_0,
                popuplayertitle: 'HAB_URBANA_py',
                interactive: true,
                title: '<img src="styles/legend/HAB_URBANA_py_0.png" /> HAB_URBANA_py'
            });

lyr_HAB_URBANA_py_0.setVisible(true);
var layersList = [lyr_HAB_URBANA_py_0];
lyr_HAB_URBANA_py_0.set('fieldAliases', {'SECTOR': 'SECTOR', 'AMBITO': 'AMBITO', 'TIPO': 'TIPO', 'OBS': 'OBS', 'PARTIDA_R': 'PARTIDA_R', 'PROCESO': 'PROCESO', 'ANIO': 'ANIO', 'PTL': 'PTL', 'RESOL': 'RESOL', });
lyr_HAB_URBANA_py_0.set('fieldImages', {'SECTOR': 'TextEdit', 'AMBITO': 'TextEdit', 'TIPO': 'TextEdit', 'OBS': 'TextEdit', 'PARTIDA_R': 'TextEdit', 'PROCESO': 'TextEdit', 'ANIO': 'TextEdit', 'PTL': 'TextEdit', 'RESOL': 'TextEdit', });
lyr_HAB_URBANA_py_0.set('fieldLabels', {'SECTOR': 'header label - visible with data', 'AMBITO': 'header label - always visible', 'TIPO': 'header label - always visible', 'OBS': 'header label - always visible', 'PARTIDA_R': 'header label - always visible', 'PROCESO': 'header label - always visible', 'ANIO': 'header label - always visible', 'PTL': 'header label - always visible', 'RESOL': 'header label - always visible', });
lyr_HAB_URBANA_py_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});