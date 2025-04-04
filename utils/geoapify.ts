const API_KEY = "a3ea677f91d1499ab68c41f059d1bf8f"; // Replace with your real API key

export async function fetchNearbyHospitals(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features) {
      console.error("Invalid API response:", data);
      return [];
    }

    return data.features.map((place: any) => ({
      name: place.properties.name || "Unknown Hospital",
      address: place.properties.address_line1 || "No address available",
      lat: place.geometry.coordinates[1], // GeoJSON format [lon, lat]
      lon: place.geometry.coordinates[0],
    }));
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}

export async function geocodeLocation(query: string) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features.length) {
      console.error("Geocoding API returned no results.");
      return null;
    }

    const location = data.features[0].geometry.coordinates;
    return { lat: location[1], lon: location[0] };
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
}

export async function getRoute(lat1: number, lon1: number, lat2: number, lon2: number) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${lat1},${lon1}|${lat2},${lon2}&mode=drive&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      console.error("No route found.");
      return [];
    }

    return data.features[0].geometry.coordinates.map((coord: number[]) => ({
      lon: coord[0],
      lat: coord[1],
    }));
  } catch (error) {
    console.error("Error fetching route:", error);
    return [];
  }
}
