import React from 'react';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import { Button, Grid } from '@material-ui/core';

import MoonIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness1';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LightningIcon from '@material-ui/icons/FlashOn';
import { getDaylightData } from '../functions/DaylightAPI';
import { LightAPIResponse } from '../data/LightAPIResponse';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';
import { tempData } from '../data/TestData';
import { buildLightCurve } from '../functions/BuildLightCurve';
import { Wave } from '../data/Wave';
import WaveController from './WaveController';
import { LightDataPoint } from '../data/LightDataPoint';

interface LightControlProps {
    latitude: number;
    longitude: number;
}

interface LightControlState {
    lightApiResponse: LightAPIResponse;
    lightData: LightDataPoint[];
    waves: Wave[];
    
}

class LightControl extends React.Component<LightControlProps, LightControlState> {
    constructor(props: LightControlProps) {
        super(props);
        this.state = {
            lightApiResponse: {

                results: {
                    astronomical_twilight_begin: "",
                    astronomical_twilight_end: "",
                    civil_twilight_begin: "",
                    civil_twilight_end: "",
                    day_length: 28800,
                    nautical_twilight_begin: "",
                    nautical_twilight_end: "",
                    solar_noon: "",
                    sunrise: "",
                    sunset: ""
                },
                status: "OK"
                
            },
            waves: [],
            lightData: []          
        }

        this.addWave = this.addWave.bind(this);
        this.removeWave = this.removeWave.bind(this);
        this.updateWave = this.updateWave.bind(this);
        
    }

    componentDidMount() {
        getDaylightData(this.props.latitude, this.props.longitude).then(res => {
            console.log(res);
            this.setState({ lightApiResponse: res.data });
            this.buildLightData([]);
		})
    }

    private addWave() {
        let wave = new Wave();
        wave.amplitude = 180;
        wave.vertical_shift = 27;
        wave.period_coefficient = 2 * Math.PI / (this.state.lightApiResponse.results.day_length / 60)
        wave.period = 0.5;

        let newArray = this.state.waves.slice();
        newArray.splice(0, 0, wave);
        this.setState({ waves: newArray });
        this.buildLightData(newArray);

    }

    private updateWave(wave: Wave, index: number) {
        let newArray = this.state.waves.slice();
        newArray.splice(index, 1);
        newArray.splice(0, 0, wave);
        this.setState({ waves: newArray });
        this.buildLightData(newArray);

    }

    private removeWave(index: number) {
        let newArray = this.state.waves.slice();
        newArray.splice(index, 1);
        this.setState({ waves: newArray });
        this.buildLightData(newArray);
    }

    private buildLightData(waves: Wave[]) {
        console.log(this.state.lightApiResponse);
        console.log(this.state.lightApiResponse.results.sunrise);
        console.log(new Date(this.state.lightApiResponse.results.sunrise));
        console.log(new Date(this.state.lightApiResponse.results.sunrise).getTime());

        let lightData = buildLightCurve(waves);
        console.log(lightData);
        this.setState({ lightData: lightData });
    }

    public render() {
        const { waves, lightData, lightApiResponse } = this.state;
        
        return(
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <div style={{display: 'flex', flexDirection: 'column', fontSize: '11pt'}}>
                        <span>{new Date(lightApiResponse.results.sunrise).toLocaleString()}</span>
                        <span>{new Date(lightApiResponse.results.sunrise).getTime()}</span>
                        <span>{new Date(lightApiResponse.results.sunset).toLocaleString()}</span>
                        <span>{new Date(lightApiResponse.results.sunset).getTime()}</span>
                        <span>Seconds of daylight today: {lightApiResponse.results.day_length}</span>
                        <span>Minutes: {lightApiResponse.results.day_length / 60}</span>
                        <span>Hours: {lightApiResponse.results.day_length / 60 / 60}</span>

                        <span>Seconds in a day: 86400</span>
                        <span>Minutes: {86400 / 60}</span>
                        <span>Hours: {86400 / 60 / 60}</span>

                        <span>{new Date(lightApiResponse.results.solar_noon).toLocaleString()}</span>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <LineChart width={830} height={400} data={lightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis dataKey="level" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="level" stroke="yellow" />
                    </LineChart>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: 'flex', fontSize: '10pt'}}>
                        <span style={{margin: 5, width: '16.666%'}}>Wave #</span>
                        <span style={{margin: 5, width: '16.666%'}}>Type</span>
                        <span style={{margin: 5, width: '16.666%'}}>Amplitude</span>
                        <span style={{margin: 5, width: '16.666%'}}>Vertical Shift</span>
                        <span style={{margin: 5, width: '16.666%'}}>Period Coefficient</span>
                        <span style={{margin: 5, width: '16.666%'}}>Period</span>
                    </div>
                    {
                        waves.map((wave, index) => (
                            <WaveController key={"wave" + index} index={index} updateWave={this.updateWave} removeWave={this.removeWave} />
                        ))
                    }
                    <button onClick={this.addWave}>Add New Wave</button>
                </Grid>
            </Grid>
                
            
        )
    }
}

export default LightControl;