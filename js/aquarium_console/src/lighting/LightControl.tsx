import React from 'react';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import { Button } from '@material-ui/core';

import MoonIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness1';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LightningIcon from '@material-ui/icons/FlashOn';

interface LightControlState {
    currentDaylightBrightness: number;
    currentMoonlightBrightness: number;
    daylightsOn: boolean;
    moonlightOn: boolean;
}

class LightControl extends React.Component<{}, LightControlState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentDaylightBrightness: 0,
            currentMoonlightBrightness: 0,
            daylightsOn: false,
            moonlightOn: false
        }

        this.changeDaylightState = this.changeDaylightState.bind(this);
        this.setDaylightBrightness = this.setDaylightBrightness.bind(this);
        this.changeMoonlightState = this.changeMoonlightState.bind(this);
        this.setMoonlightBrightness = this.setMoonlightBrightness.bind(this);
    }

    private changeDaylightState() {
        this.setState(prevState =>({ daylightsOn: !prevState.daylightsOn }));
    }

    private setDaylightBrightness(event: { target: { value: number }}) {
        this.setState({ currentDaylightBrightness: event.target.value });
    }

    private changeMoonlightState() {
        this.setState(prevState =>({ moonlightOn: !prevState.moonlightOn }));
    }

    private setMoonlightBrightness(event: { target: { value: number }}) {
        this.setState({ currentMoonlightBrightness: event.target.value });
    }

    public render() {
        const { daylightsOn, moonlightOn, currentMoonlightBrightness, currentDaylightBrightness } = this.state;
        return(
            <React.Fragment>
                <div style={{textAlign: 'center'}}>
                    <h4>Controls</h4>
                </div>
                <Button variant="outlined" style={{width: '100%'}} onClick={this.changeDaylightState}>
                    <PowerIcon className="icon" style={{marginRight: 10}} />{daylightsOn ? "Daylights On":"Daylights Off" }
                </Button>
               
               <Button variant="outlined" style={{width: '100%'}} onClick={this.changeMoonlightState}>
                    <PowerIcon className="icon"  style={{marginRight: 10}} />{moonlightOn ? "Moonlights On":"Moonlights Off" }
                </Button>
                
                {
                    moonlightOn &&
                    <React.Fragment>

                    </React.Fragment>
                }
                <Button variant="outlined" style={{width: '100%'}}>
                    <LightningIcon className="icon" style={{marginRight: 10, color: 'yellow'}} />Thunderstorm
                </Button>
            </React.Fragment>
            
        )
    }
}

export default LightControl;