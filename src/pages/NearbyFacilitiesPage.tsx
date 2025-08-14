import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Phone, Clock, Star, Map } from 'lucide-react';

// Mock data for Zambian health facilities
interface HealthFacility {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  phone: string;
  hours: string;
  rating: number;
  services: string[];
  address: string;
  distance?: number;
}

const healthFacilities: HealthFacility[] = [
  {
    id: 1,
    name: "University Teaching Hospital",
    lat: -15.3875,
    lng: 28.3228,
    type: "Hospital",
    phone: "+260 211 256067",
    hours: "24/7",
    rating: 4.2,
    services: ["Emergency", "Pediatrics", "Surgery"],
    address: "Nationalist Rd, Lusaka"
  },
  {
    id: 2,
    name: "Levy Mwanawasa Medical University Hospital",
    lat: -15.3928,
    lng: 28.2875,
    type: "Hospital",
    phone: "+260 211 255555",
    hours: "24/7",
    rating: 4.5,
    services: ["Emergency", "Pediatrics", "Maternity"],
    address: "Levy Junction, Lusaka"
  },
  {
    id: 3,
    name: "Lusaka South Multi-facility Hospital",
    lat: -15.4500,
    lng: 28.2800,
    type: "Hospital",
    phone: "+260 211 240000",
    hours: "24/7",
    rating: 4.0,
    services: ["Emergency", "General Medicine", "Pediatrics"],
    address: "Kafue Road, Lusaka"
  },
  {
    id: 4,
    name: "Chilenje Level 1 Hospital",
    lat: -15.3650,
    lng: 28.3100,
    type: "Clinic",
    phone: "+260 211 234567",
    hours: "07:00 - 17:00",
    rating: 3.8,
    services: ["Primary Care", "Vaccination", "Maternity"],
    address: "Chilenje, Lusaka"
  },
  {
    id: 5,
    name: "Kalingalinga Clinic",
    lat: -15.3800,
    lng: 28.3500,
    type: "Clinic",
    phone: "+260 211 345678",
    hours: "07:00 - 17:00",
    rating: 3.9,
    services: ["Primary Care", "Child Health", "HIV/AIDS"],
    address: "Kalingalinga, Lusaka"
  }
];

const NearbyFacilitiesPage = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  useEffect(() => {
    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationError('Unable to get your location. Showing default area (Lusaka).');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const facilitiesWithDistance = userLocation 
    ? healthFacilities.map(facility => ({
        ...facility,
        distance: calculateDistance(userLocation.lat, userLocation.lng, facility.lat, facility.lng)
      })).sort((a, b) => a.distance - b.distance)
    : healthFacilities;

  const handleDirections = (facility: HealthFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const openGoogleMaps = () => {
    const center = userLocation || { lat: -15.4067, lng: 28.2871 };
    const markers = healthFacilities.map(f => `${f.lat},${f.lng}`).join('|');
    const url = `https://www.google.com/maps/@${center.lat},${center.lng},12z/data=!3m1!4b1!4m2!6m1!1s${markers}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Nearby Health Facilities</h1>
        <p className="text-muted-foreground">Find hospitals and clinics near your location</p>
      </div>

      {locationError && (
        <Alert className="mb-4">
          <MapPin className="h-4 w-4" />
          <AlertDescription>{locationError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Map Placeholder Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map View
            </CardTitle>
            <CardDescription>Health facilities in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
              <div className="text-center space-y-4">
                <Map className="h-16 w-16 text-primary mx-auto" />
                <div>
                  <p className="text-lg font-semibold text-primary mb-2">Interactive Map</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    View health facilities on an interactive map
                  </p>
                  <Button onClick={openGoogleMaps} className="gap-2">
                    <MapPin className="h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Facilities List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Health Facilities</CardTitle>
            <CardDescription>
              {userLocation ? 'Sorted by distance from your location' : 'Health facilities in Lusaka area'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {facilitiesWithDistance.map((facility) => (
                <div 
                  key={facility.id} 
                  className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm">{facility.name}</h4>
                    <Badge variant={facility.type === 'Hospital' ? 'default' : 'secondary'}>
                      {facility.type}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{facility.address}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {facility.hours}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {facility.rating}
                    </div>
                    {facility.distance && (
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {facility.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {facility.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirections(facility);
                      }}
                      className="flex-1"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(facility.phone);
                      }}
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Facility Details Modal */}
      {selectedFacility && (
        <Card className="mt-6 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedFacility.name}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedFacility(null)}
              >
                ✕
              </Button>
            </CardTitle>
            <CardDescription>{selectedFacility.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedFacility.type === 'Hospital' ? 'default' : 'secondary'}>
                    {selectedFacility.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{selectedFacility.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  {selectedFacility.hours}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {selectedFacility.phone}
                </div>
                {selectedFacility.distance && (
                  <div className="flex items-center gap-2 text-sm">
                    <Navigation className="h-4 w-4" />
                    {selectedFacility.distance.toFixed(1)} km away
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFacility.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleDirections(selectedFacility)} className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" onClick={() => handleCall(selectedFacility.phone)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NearbyFacilitiesPage;