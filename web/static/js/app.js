import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import L from "leaflet"

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("locations:lobby", {})

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("new_location", payload => {
  if (window.map && payload.lat && payload.lon) {
    let loc = new L.LatLng(payload.lat, payload.lon);

    window.marker.setLatLng(loc);
    window.map.setView(loc);
  }
})

ready(() => {
  var map = L.map('map');
  window.map = map;

  map.setView([29.951065, -90.071533], 14);

  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
  }).addTo(map);

  let lastKnownLocation = [29.951065, -90.071533];

  window.marker = new L.CircleMarker(
    new L.LatLng(lastKnownLocation[0], lastKnownLocation[1]),
    {
      radius: 5,
      opacity: 1.0,
      fillOpacity: 0.5
    }
  );

  window.marker.addTo(window.map);
});



