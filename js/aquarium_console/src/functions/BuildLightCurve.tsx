import { Wave } from "../data/Wave";
import { LightDataPoint } from "../data/LightDataPoint";
/**
 * Light is updated every minute.  There are 1440 minutes every day.
 * Light values can never be less than 0.
 *
 */
export function buildLightCurve(waves: Wave[]) {
    let lightData: LightDataPoint[] = [];
    for(var i = 0; i < 1440; i++) {
        var newLevel = 0;
        // sum the output of each equation and add this as a data point
        waves.forEach(wave => {
            newLevel += wave.calculateLightIntensity(i);
        });

        if(newLevel < 0) {
            newLevel = 0;
        }
        lightData.push({ time: i, level: newLevel });
    }
    return lightData;
}