import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.heat';

const HeatmapLayer = ({ points = [], ...options }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(points, options).addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, options]);

  return null;
};

export default HeatmapLayer;
