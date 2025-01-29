 import { defaultLatitude, defaultLongitude } from '../constants/constants';

 const getLocation = (): Promise<{ latitude: string; longitude: string }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            });
          },
          (error) => {
            reject(new Error(`${error}`));
          }
        );
      } else {
        resolve({
          latitude: defaultLatitude.toString(),
          longitude: defaultLongitude.toString(),
        });
      }
    });
  };

export {getLocation}