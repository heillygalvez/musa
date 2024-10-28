import React, { useState, useEffect } from 'react'
import Map, { Source, Layer } from 'react-map-gl/maplibre';
import "./InteractiveMap.css"
import useWindowDimensions from '../helpers/useWindowDimensions';

import polygons from "../../mockData/mockFarms.json"

export function InteractiveMap({lon, lat, z, farmId, setFarmId}) {
  const [highlightedFarm, setHighlightedFarm] = useState(null)
  const [selectedLayerData, setSelectedLayerData] = useState({})
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY
  const {windowWidth, windowHeight} = useWindowDimensions()
  const lineStyle = {
    type: "line",
    paint: {
      'line-color': 'white',
      'line-width': 5
    }
  }
  const fillStyle = {
    type: "fill",
    paint: {
      'fill-color': 'transparent',
    }
  }
  const selectionStyle = {
    type: "fill",
    paint: {
      'fill-color': '#b5e670',
    }
  }
  
  const handleHover = (e) => {
    if(e.features?.length) {
      const feature = e.features[0]._vectorTileFeature
      setHighlightedFarm(feature.properties.id)
      e.target.getCanvas().style.cursor = "pointer"
    }
  }

  const handleLeave = (e) => {
    setHighlightedFarm(null)
    e.target.getCanvas().style.cursor = ""
  }

  const handleClick = (e) => {
    if(e.features?.length) {
      const feature = e.features[0]._vectorTileFeature
      setFarmId(feature.properties.id)
    } else {
      setFarmId(null)
    }
  }

  useEffect(() => {
    setSelectedLayerData({...polygons, features: polygons.features.filter(f => f.properties.id === farmId)})
  }, [farmId])

  return (
    <Map
      initialViewState={{
        longitude: lon,
        latitude: lat,
        zoom: z
      }}
      style={{width: windowWidth, height: window.innerHeight}}
      mapStyle={`https://api.maptiler.com/maps/satellite/style.json?key=${mapTilerKey}`}
      interactiveLayerIds={["polygon-fill"]}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <Source id="polygon-data" type="geojson" data={polygons}>
        <Layer id="polygon-lines" {...lineStyle}/>
        <Layer id="polygon-fill" {...fillStyle}/>
      </Source>
      <Source id="farm-data" type="geojson" data={selectedLayerData}>
        <Layer id="fill-fill" {...selectionStyle}/>
      </Source>
    </Map>
  );
}
