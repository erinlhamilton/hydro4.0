/**
 * 
 */

var fwMap = L.map('fwMap').setView([44.500, -88.7000], 8);

L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(fwMap);

var gbMap = L.map('gbMap').setView([44.700, -87.800], 10);

L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(gbMap);



//WMS request for Michigan tech remote sensing imagery of Green Bay
//var mtri = L.tileLayer.wms("http://geoserver2.mtri.org/geoserver/WaterRemoteSensing/wms?", {
//    layers: 'WaterRemoteSensing:SM_Michigan_20130620',
//    format: 'image/png',
//    version: '1.1.0',
//    attribution: 'Michigan Tech',
//    srs:'EPSG:4326'
//}).addTo(map);