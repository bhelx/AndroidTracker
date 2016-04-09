import "phoenix_html"

import socket from "./socket"
import L from "leaflet"

let map, marker, popup;

let ready = (fn) => {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("locations:lobby", {})

channel.join()
  .receive("ok", resp => { console.log("Joined channel", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("new_location", payload => {
  console.log(payload);

  if (map && payload.lat && payload.lon) {
    let loc = new L.LatLng(payload.lat, payload.lon);

    marker.setLatLng(loc);
    map.setView(loc);

    popup.setLatLng(loc)
      .setContent(`<p>Recorded at: ${payload.created}</p>`)
  }
})

ready(() => {
  map = L.map('map');

  map.setView([window.lastKnownLocation.lat, window.lastKnownLocation.lon], 11);

  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
  }).addTo(map);

  let loc = new L.LatLng(window.lastKnownLocation.lat, window.lastKnownLocation.lon);

  marker = new L.CircleMarker(
    loc,
    {
      radius: 5,
      opacity: 1.0,
      fillOpacity: 0.5
    }
  );

  marker.addTo(map);

  let time = window.lastKnownLocation.created;

  popup = L.popup()
    .setLatLng(loc)
    .setContent(`<p>Recorded at: ${time}</p>`)
    .openOn(map);
});


