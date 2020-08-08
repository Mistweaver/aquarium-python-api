export interface LightAPIResponse {
    results: {
        astronomical_twilight_begin: string;
        astronomical_twilight_end: string;
        civil_twilight_begin: string;
        civil_twilight_end: string;
        day_length: number;
        nautical_twilight_begin: string;
        nautical_twilight_end: string;
        solar_noon: string;
        sunrise: string;
        sunset: string;
    }
    status: string;
    
}