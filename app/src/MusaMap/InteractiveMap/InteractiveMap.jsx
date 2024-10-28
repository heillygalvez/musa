import React, { useState, useEffect } from 'react'
import Map, { Source, Layer } from 'react-map-gl/maplibre';
import "./InteractiveMap.css"
import useWindowDimensions from '../helpers/useWindowDimensions';

import polygons from "../../mockData/mockFarms.json"

export function InteractiveMap({lon, lat, z, farmId, setFarmId}) {
  const [highlightedFarmId, setHighlightedFarmId] = useState(null)
  const [selectedLayerData, setSelectedLayerData] = useState({})
  const [hoveredLayerData, setHoveredLayerData] = useState({})

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
  const hoverStyle = {
    type: "fill",
    paint: {
      'fill-color': '#b5e670',
    }
  }

  
  const handleHover = (e) => {
    if(e.features?.length) {
      const feature = e.features[0]._vectorTileFeature
      setHighlightedFarmId(feature.properties.id)
      e.target.getCanvas().style.cursor = "pointer"
    }
  }

  const handleLeave = (e) => {
    setHighlightedFarmId(null)
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

  useEffect(() => {
    setHoveredLayerData({...polygons, features: polygons.features.filter(f => f.properties.id === highlightedFarmId)})
  }, [highlightedFarmId])

  return (
    <Map
      initialViewState={{
        longitude: lon,
        latitude: lat,
        zoom: z
      }}
      style={{width: windowWidth, height: window.innerHeight}}
      mapStyle={`https://api.maptiler.com/maps/satellite/style.json?key=${mapTilerKey}`}
      interactiveLayerIds={farmId ? ["selected-fill"]: ["polygon-fill", "hovered-fill","polygon-lines"]}
      onMouseMove={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <Source id="polygon-data" type="geojson" data={polygons}>
        <Layer id="polygon-lines" {...lineStyle}/>
        <Layer id="polygon-fill" {...fillStyle}/>
      </Source>
      <Source id="hover-data" type="geojson" data={hoveredLayerData}>
        <Layer id="hover-fill" {...hoverStyle}/>
      </Source>
      <Source id="selected-data" type="geojson" data={selectedLayerData}>
        <Layer id="selected-fill" {...lineStyle}/>
      </Source>
    </Map>
  );
}
