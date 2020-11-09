import React from 'react'
import './css/Map.css';
// import { LeafletMap, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ center, zoom }) {
    return (
        <div className="map">
            {/* <h1>I am a Map</h1> */}
            {/* <LeafletMap>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </LeafletMap> */}
            {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}> */}
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
