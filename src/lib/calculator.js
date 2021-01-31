const dayIndex = new Date().getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function sortBreweriesByDistance(breweries, payload) {
  const result = breweries.filter(brewery => brewery.open.indexOf(days[dayIndex]) !== -1)
                  .map(brewery => {
                    return {
                      ...brewery, 
                      distance: getDistanceInKm(brewery.locationProperties.lat, brewery.locationProperties.lng, payload.lat, payload.lon)
                    }})
                  .sort((a,b) => a.distance - b.distance);
  console.log('sort result', result);
  return result;
}

function getDistanceInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


export function getMapBounds(coords) {
  return {
    northernmost: findNorthernmostPoint(coords),
    southernmost: findSouthernmostPoint(coords)
  }
}

function findNorthernmostPoint(locationProperties) {
  return locationProperties.reduce(function(prev, current) {
    const currentLongtitude = current.lng || current.lon;
    const prevLongtitude = prev.lng || prev.lon;
    return (prevLongtitude < currentLongtitude) ? prev : current
  })
}

function findSouthernmostPoint(locationProperties) {
  return locationProperties.reduce(function(prev, current) {
    const currentLongtitude = current.lng || current.lon
    const prevLongtitude = prev.lng || prev.lon;
    return (prevLongtitude > currentLongtitude) ? prev : current
  })
}