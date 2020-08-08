// Sunrise & Sunset API can be found at https://sunrise-sunset.org/api

import axios from 'axios';

/*
 * Rio Negro, BRA 0°25'25.9"S 64°39'23.0"W -0.423861, -64.656390 
   "lat": -0.423861,   # latitude
   "lng": -64.656390,  # longitude
 * 
 * Phoenix
   "lat": 33.4942,   # latitude
   "lng": -111.9261,  # longitude
 */ 
export function getDaylightData(latitude: number, longitude: number) {
    return axios.get("https://api.sunrise-sunset.org/json", {
        params: {
            lat: latitude,  // latitude
            lng: longitude, // longitude
            // "date": "today",  # this is the default value, but can be used for custom day
            formatted: 0    // a value of 1 brings back readable form, 0 brings back raw
        }
    }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}