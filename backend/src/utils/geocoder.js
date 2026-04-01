// backend/src/utils/geocoder.js

/**
 * Utility to convert an address string into latitude and longitude coordinates
 * using the OpenStreetMap Nominatim API.
 */
import axios from 'axios';

export const geocodeAddress = async (addressStr) => {
  try {
    if (!addressStr || typeof addressStr !== 'string') return null;

    // Use a unique User-Agent as required by Nominatim's strict usage policy
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      addressStr
    )}&format=json&limit=1`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Grocera-App/1.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (response.data && response.data.length > 0) {
      const match = response.data[0];
      return {
        lat: parseFloat(match.lat),
        lng: parseFloat(match.lon), // Note: Nominatim returns 'lon' instead of 'lng'
      };
    }

    // Fallback if the strict address query yields nothing
    console.warn(`[Geocoder] No results found for address: "${addressStr}"`);
    return null;
  } catch (error) {
    console.error(`[Geocoder] API Error geocoding "${addressStr}":`, error.message);
    return null;
  }
};
