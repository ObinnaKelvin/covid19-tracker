import React from 'react'
import './css/Map.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from './img/marker-icon.png';
import iconShadow from './img/marker-shadow.png';
import { showDataOnMap } from './util';


var myIcon = L.icon ({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41] 
})

function Map({ countries, casesType, center, zoom, color }) {
    return (
        <div className="map">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Loop through countries and draw circles on the screen */}
                { showDataOnMap(countries, casesType, color) }
                <Marker position={center} icon={myIcon}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
