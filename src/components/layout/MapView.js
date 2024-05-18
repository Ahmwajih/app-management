import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
  const { id } = useParams();
  const firms = useSelector((state) => state.firms.data); 
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const getLatLongFromAddress = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  useEffect(() => {
    const firm = firms.find((firm) => firm.id === parseInt(id));
    if (firm) {
      getLatLongFromAddress(firm.address)
        .then((coords) => setLocation(coords))
        .catch((error) => console.error(error)); 
    }
  }, [id, firms]); 

  if (!location.lat || !location.lng) {
    return <div>Loading map or location not found...</div>;
  }

  return (
    <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>
          {`Latitude: ${location.lat}, Longitude: ${location.lng}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
