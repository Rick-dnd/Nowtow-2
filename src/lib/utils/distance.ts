/**
 * Calculate distance between two geographic coordinates using the Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * Shows in meters if < 1km, otherwise in kilometers
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)}km`;
  } else {
    return `${Math.round(distanceKm)}km`;
  }
}

/**
 * Sort array of items by distance from a given location
 */
export function sortByDistance<T extends { latitude: number; longitude: number }>(
  items: T[],
  userLatitude: number,
  userLongitude: number
): T[] {
  return items.sort((a, b) => {
    const distanceA = calculateDistance(userLatitude, userLongitude, a.latitude, a.longitude);
    const distanceB = calculateDistance(userLatitude, userLongitude, b.latitude, b.longitude);
    return distanceA - distanceB;
  });
}

/**
 * Filter items within a certain radius (in kilometers)
 */
export function filterByRadius<T extends { latitude: number; longitude: number }>(
  items: T[],
  userLatitude: number,
  userLongitude: number,
  radiusKm: number
): T[] {
  return items.filter((item) => {
    const distance = calculateDistance(userLatitude, userLongitude, item.latitude, item.longitude);
    return distance <= radiusKm;
  });
}
