export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export async function getCurrentLocation(): Promise<UserLocation> {
  if (!("geolocation" in navigator)) {
    throw new Error("Location services are not supported by this browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                "Location permission was denied. Please allow location access and try again.",
              ),
            );
            break;

          case error.POSITION_UNAVAILABLE:
            reject(
              new Error(
                "Your current location could not be determined.",
              ),
            );
            break;

          case error.TIMEOUT:
            reject(
              new Error(
                "Location request timed out. Please try again.",
              ),
            );
            break;

          default:
            reject(new Error("Unable to get your current location."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  });
}