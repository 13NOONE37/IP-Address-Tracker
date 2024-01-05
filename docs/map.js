const markerIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

export const tileLayer = {
  source: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

export function initMap(id, coords = [0, 0], minZoom = 4, zoom = 17) {
  return L.map(id, {
    center: coords,
    zoom: zoom,
    minZoom: minZoom,
    zoomControl: false,
  });
}

export function setTile(map, layer, maxZoom, attribution) {
  return L.tileLayer(layer, {
    maxZoom,
    attribution,
  }).addTo(map);
}

export function addMarker(map, coords) {
  return L.marker(coords, {
    icon: markerIcon,
  }).addTo(map);
}

export function removeMarker(map, marker) {
  if (marker) map.removeLayer(marker);
  return;
}

export function setCenter(map, coords) {
  map.panTo(coords);
  return;
}
