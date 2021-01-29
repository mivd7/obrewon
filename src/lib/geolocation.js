const geolocationConfig = {
  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  success: function (pos) {
    return pos.coords;
  },
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}

export default geolocationConfig;