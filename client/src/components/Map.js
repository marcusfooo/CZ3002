import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

function customIcon(price) {
  return L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <div className="d-flex align-items-center h-100">
        <span className="text-nowrap">${price} SGD</span>
      </div>
    ),
  });
}

const getCoords = async (listing) => {
  try {
    const res = await fetch(
      `https://developers.onemap.sg/commonapi/search?searchVal=${listing.postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    const results = await res.json();
    if (results.results.length > 0) {
      return [
        parseFloat(results.results[0]["LATITUDE"]),
        parseFloat(results.results[0]["LONGITUDE"]),
      ];
    } else {
      return;
    }
  } catch (err) {
    console.error("Failed to fetch coordinates");
  }
};

export default function Map({ listings }) {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    async function coordsWrapper() {
      const res = await Promise.all(
        listings.map(async (listing) => {
          const res = await getCoords(listing);
          return res;
        })
      );
      setCoords(res.filter(Boolean));
    }
    coordsWrapper();
  }, [listings]);

  return (
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
      {coords.map((coord, idx) => (
        <Marker
          key={idx}
          position={coord}
          icon={customIcon(listings[idx]?.price)}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
