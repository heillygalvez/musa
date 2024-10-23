import Map from 'react-map-gl/maplibre';

function InteractiveMap() {
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle={`https://api.maptiler.com/maps/satellite/style.json?key=${mapTilerKey}`}
    />
  );
}

export default InteractiveMap;