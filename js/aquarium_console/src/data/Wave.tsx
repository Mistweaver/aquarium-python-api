export class Wave {
    type: string;               // sin, cos, or tan
    amplitude: number;          // lightMax - lightMin
    vertical_shift: number;     // lightMin
    period_coefficient: number; //  2 * math.pi / (currentDaylightData['results']['day_length'] / 60)   # convert to seconds
    period: number;              // 1/2 usually

    constructor() {
        this.type = "SIN"
        this.amplitude = 180;
        this.vertical_shift = 28;
        this.period_coefficient = 2 * Math.PI / 480;
        this.period = 0.5;
    }

    public calculateLightIntensity(t: number) {
        let light_intensity = 0;
        if(this.type === "SIN") {
            console.log("Calculating light intensity");
            //console.log("Amplitude: " + this.amplitude);
            //console.log(this.period_coefficient);
            //console.log(this.period);
            //console.log(this.vertical_shift);
            //console.log(Math.sin(this.period_coefficient * this.period));
            light_intensity = 
            this.amplitude * 
            Math.sin(this.period_coefficient * this.period * t ) + 
            this.vertical_shift;
        } else if(this.type === "COS") {
            light_intensity = 
            this.amplitude * 
            Math.cos(this.period_coefficient * this.period * t) + 
            this.vertical_shift;
        } else if(this.type === "TAN") {
            light_intensity = 
            this.amplitude * 
            Math.tan(this.period_coefficient * this.period * t) + 
            this.vertical_shift;
        }
        
        return Math.round(light_intensity);
    }

}