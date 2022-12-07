import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '250px',
};

const DetailPropertyPreviewMap = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
  });

  const center = useMemo(
    () => ({
      lat: +location.latitude,
      lng: +location.longitude,
    }),
    [location],
  );

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <p>Loading...</p>
  );
};

export default DetailPropertyPreviewMap;
