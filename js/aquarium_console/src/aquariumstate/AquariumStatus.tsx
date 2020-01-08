import React from 'react';
import { FaWater, FaThermometerEmpty, FaThermometerFull, FaThermometerHalf, FaThermometerQuarter, FaThermometerThreeQuarters, FaThermometer } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { Button } from '@material-ui/core';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';

interface AquariumStatusProps {
    temperatureCelcius: number;
    daylightOn: boolean;
    daylightLevels: number;
    moonlightOn: boolean;
    moonlightLevels: number;
    atmosphericTemperature: number;
    atmosphericHumidity: number;
    waterLevel: number;
}
interface AquariumStatusState {

}

class AquariumStatus extends React.Component<AquariumStatusProps, AquariumStatusState> {
    constructor(props: AquariumStatusProps) {
        super(props);
        this.state = {

        }
    }

    private renderWaterTempIcon() {
        const { temperatureCelcius } = this.props;
        if(temperatureCelcius <= 21.666) {
            return <FaThermometerEmpty style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 21.666 && temperatureCelcius <= 23.333) {
            return <FaThermometerQuarter  style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 23.333 && temperatureCelcius <= 24.444) {
            return <FaThermometerHalf  style={{color: 'lightblue', marginRight: 10}}/>
        } else if(temperatureCelcius > 24.444 && temperatureCelcius <= 27.777) {
            return <FaThermometerThreeQuarters  style={{color: 'yellowgreen', marginRight: 10}}/>
        } else if(temperatureCelcius >  27.777) {
            return <FaThermometerFull  style={{color: 'red', marginRight: 10}}/>
        } else {
            return <FaThermometer  style={{color: 'grey', marginRight: 10}}/>
        }
    }
    
    private renderAtmosphericTempIcon() {
        const { atmosphericTemperature } = this.props;
        if(atmosphericTemperature <= 50) {
            return <FaThermometerEmpty style={{color: 'blue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 50 && atmosphericTemperature <= 60) {
            return <FaThermometerQuarter  style={{color: 'blue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 60 && atmosphericTemperature <= 70) {
            return <FaThermometerHalf  style={{color: 'lightblue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 70 && atmosphericTemperature <= 80) {
            return <FaThermometerThreeQuarters  style={{color: 'yellowgreen', marginRight: 10}}/>
        } else if(atmosphericTemperature >  80) {
            return <FaThermometerFull  style={{color: 'red', marginRight: 10}}/>
        } else {
            return <FaThermometer  style={{color: 'grey', marginRight: 10}}/>
        }
    }

    public render() {
        const { temperatureCelcius, daylightLevels, daylightOn, moonlightLevels, moonlightOn, atmosphericHumidity, atmosphericTemperature, waterLevel } = this.props;
        const temperatureFahrenheit = (temperatureCelcius * 9 / 5 + 32).toFixed(2);
        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button variant="outlined" style={{margin: 5}}>
                    {this.renderWaterTempIcon()}{temperatureCelcius + "F / " + temperatureFahrenheit + "C Water Temperature"}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    <PowerIcon className={daylightOn ? 'on' : 'dark-color-primary-2'} style={{marginRight: 10}} />{"Daylight: " + daylightLevels}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    <PowerIcon className={moonlightOn ? 'on' : 'dark-color-primary-2'} style={{marginRight: 10}} />{"Moonlight: " + moonlightLevels}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    <WiHumidity style={{color: 'lightblue', marginRight: 10}} />{atmosphericHumidity + " Atmospheric Humidity"}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    {this.renderAtmosphericTempIcon()}{atmosphericTemperature + " Atmospheric Temperature"}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    <FaWater style={{color: 'blue', marginRight: 10}} />{waterLevel + " Water Level"}
                </Button>
                <Button variant="outlined" style={{margin: 5}}>
                    <OnDemandVideoIcon className="color-secondary-1-2" style={{marginRight: 10}} />{" Live Feed"}
                </Button>
            </div>
        )
    }
}

export default AquariumStatus;