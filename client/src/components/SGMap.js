import React from "react";
import Container from "react-bootstrap/Container";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SGMap() {
  return (
    <Container>
      <MapContainer
        center={[1.360278, 103.8083]}
        zoom={12}
        scrollWheelZoom={true}
        maxBounds={[
          [1.56073, 104.1147],
          [1.16, 103.502],
        ]}
      >
        <TileLayer
          attribution='<img src="https://docs.onemap.gov.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
          url="https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png"
        />
        <Marker position={[1.360278, 103.8083]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
}
