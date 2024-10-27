import React from 'react'
import Map from 'react-map-gl/maplibre';
import "./InteractiveMap.css"
import useWindowDimensions from '../helpers/useWindowDimensions';

export function InteractiveMap({lon, lat, z}) {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY
  const {windowWidth, windowHeight} = useWindowDimensions()
  return (
    <Map
      initialViewState={{
        longitude: lon,
        latitude: lat,
        zoom: z
      }}
      style={{width: windowWidth, height: window.innerHeight}}
      mapStyle={`https://api.maptiler.com/maps/satellite/style.json?key=${mapTilerKey}`}
    />
  );
}
