import {
  addMarker,
  initMap,
  removeMarker,
  setCenter,
  setTile,
  tileLayer,
} from './map.js';

const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
const domainRegex = /^(?!:\/\/)(?:[a-zA-Z0-9-]{1,63}\.?){1,}(?:[a-zA-Z]{2,})$/;
const API_KEY = 'at_TSXooTtyjk1j3P0J1qY43fyMH4jI2'; //In real project we should move it to our backend

const formElement = document.querySelector('.ipContainer');
formElement.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  const inputElement = document.querySelector('.ipContainer--input');
  const value = inputElement.value;

  if (ipRegex.test(value))
    return applyInformation({ ip: value, domain: undefined });
  if (domainRegex.test(value))
    return applyInformation({ ip: undefined, domain: value });

  return alert('Wrong IP or domain');
}

const map = initMap('map', [0, 0], 4, 15);
setTile(map, tileLayer.source, 18, tileLayer.attribution);
applyInformation();

let currentMarker = null;
async function applyInformation({ ip = undefined, domain = undefined } = {}) {
  const ipElement = document.querySelector('.resultContainer [data-ip]');
  const locationElement = document.querySelector(
    '.resultContainer [data-location]',
  );
  const timezoneElement = document.querySelector(
    '.resultContainer [data-timezone]',
  );
  const ispElement = document.querySelector('.resultContainer [data-isp]');

  const result = await getAddressInfo({ ip, domain });
  if (!result) return;

  ipElement.textContent = result.ip;
  locationElement.textContent = `${result.location.region}, ${result.location.city}`;
  timezoneElement.textContent = `UTC ${result.location.timezone}`;
  ispElement.textContent = result.isp;

  const lat = result.location.lat;
  const lng = result.location.lng;

  setCenter(map, [lat, lng]);
  removeMarker(map, currentMarker);
  currentMarker = addMarker(map, [lat, lng]);
}
async function getAddressInfo({ ip = '', domain = '' } = {}) {
  try {
    const data = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}&domain=${domain}`,
    );
    const result = await data.json();
    return result;
  } catch (error) {
    return null;
  }
}
