const dayIndex = new Date().getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function sortBreweriesByDistance(breweries) {
  return breweries.filter(brewery => brewery.open.indexOf(days[dayIndex]) !== -1)
                  .map(brewery => {
                    return {
                      ...brewery, 
                      distance: getDistanceInKm(brewery.locationProperties.lat, brewery.locationProperties.lng, action.payload.lat, action.payload.lon)
                    }})
                  .sort((a,b) => a.distance - b.distance);
}