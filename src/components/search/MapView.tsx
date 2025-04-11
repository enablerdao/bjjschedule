import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Loader } from '@googlemaps/js-api-loader';

type MapViewProps = {
  results: any[];
};

export default function MapView({ results }: MapViewProps) {
  const { t } = useTranslation(['common', 'search']);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  
  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          console.error('Google Maps API key is missing');
          return;
        }
        
        const loader = new Loader({
          apiKey,
          version: 'weekly',
        });
        
        const google = await loader.load();
        
        if (mapRef.current) {
          // Create map instance
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 35.6812, lng: 139.7671 }, // Default to Tokyo
            zoom: 10,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: false,
            zoomControl: true,
          });
          
          setMap(mapInstance);
          
          // Create info window
          const infoWindowInstance = new google.maps.InfoWindow();
          setInfoWindow(infoWindowInstance);
        }
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    };
    
    if (!map) {
      initMap();
    }
  }, [map]);
  
  // Update markers when results change
  useEffect(() => {
    if (!map || !infoWindow || results.length === 0) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    
    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();
    
    // Create new markers
    const newMarkers = results.map(result => {
      const { academy } = result;
      
      if (!academy.latitude || !academy.longitude) return null;
      
      const position = {
        lat: academy.latitude,
        lng: academy.longitude,
      };
      
      // Extend bounds
      bounds.extend(position);
      
      // Create marker
      const marker = new google.maps.Marker({
        position,
        map,
        title: academy.name,
        animation: google.maps.Animation.DROP,
      });
      
      // Create info window content
      const content = `
        <div class="p-2">
          <h3 class="font-bold">${academy.name}</h3>
          <p class="text-sm">${result.title}</p>
          <p class="text-xs text-gray-600">${academy.city}, ${academy.country}</p>
          <a href="/classes/${result.id}" class="text-xs text-blue-600 hover:underline">
            ${t('search:viewDetails')}
          </a>
        </div>
      `;
      
      // Add click event to marker
      marker.addListener('click', () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });
      
      return marker;
    }).filter(Boolean) as google.maps.Marker[];
    
    setMarkers(newMarkers);
    
    // Fit map to bounds if there are markers
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
      
      // If only one marker, zoom out a bit
      if (newMarkers.length === 1) {
        map.setZoom(14);
      }
    }
  }, [map, infoWindow, results, t]);
  
  return (
    <div className="relative w-full h-full">
      {results.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="text-center p-4">
            <p className="text-lg font-medium text-gray-900 mb-2">
              {t('search:noResultsOnMap')}
            </p>
            <p className="text-sm text-gray-600">
              {t('search:tryDifferentFilters')}
            </p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}