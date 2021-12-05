/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';

let map;
const XHR = new XMLHttpRequest();
let myLatLng;
let issFlightPath = [];
let flightPath;
let animate;

function moveISS() {
  let data = JSON.parse(this.responseText);
  let latitude = parseFloat(data['latitude']);
  let longitude = parseFloat(data['longitude']);
  let rawLatLng = {
    lat: latitude,
    lng: longitude,
  };
  myLatLng = new google.maps.LatLng(rawLatLng);
  issFlightPath.push(rawLatLng);
  localStorage.setItem('iss', JSON.stringify(issFlightPath));
  map.panTo(myLatLng, (animate = true));

  flightPath = new google.maps.Polyline({
    path: issFlightPath,
    geodesic: true,
    strokeColor: '#FFFFFF',
    strokeOpacity: 0.5,
    strokeWeight: 3,
  });

  flightPath.setMap(map);

  window.setTimeout(doRequest, 500);
}

function doRequest() {
  const ISS_API = 'https://api.wheretheiss.at/v1/satellites/25544';
  XHR.addEventListener('load', moveISS);
  XHR.open('GET', ISS_API);
  XHR.send();
}

function initializeMap() {
  let lat = -34;
  let lng = 150;

  let mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.SATELLITE,
  };
  const MAP_CANVAS = document.getElementById('map-canvas');
  map = new google.maps.Map(MAP_CANVAS, mapOptions);

  if (localStorage.getItem('iss')) {
    issFlightPath = JSON.parse(localStorage.getItem('iss'));
  }
  doRequest();
}

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    google.maps.event.addDomListener(window, 'load', initializeMap);
  }

  render() {
    return (
      <div className="map">
        <div>
          <div  className="map-canvas" id="map-canvas"></div>
        </div>
        <div>
          <div className="pos"></div>
        </div>
      </div>
    );
  }
}

export default Map;
