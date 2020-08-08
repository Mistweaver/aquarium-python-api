import React from 'react';
import { FaWater, FaThermometerEmpty, FaThermometerFull, FaThermometerHalf, FaThermometerQuarter, FaThermometerThreeQuarters, FaThermometer } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import ListIcon from '@material-ui/icons/List';
import { DISPLAY_TEMPERATURE_DATA, DISPLAY_LIGHT_CONTROLS, DISPLAY_ATMOSPHERE_DATA, DISPLAY_FAUNA_FLORA, DISPLAY_LIVE_FEED } from '../displays/DIsplayModes';

interface AquariumStatusProps {
    temperatureCelcius: number;
    daylightOn: boolean;
    daylightLevels: number;
    moonlightOn: boolean;
    moonlightLevels: number;
    atmosphericTemperature: number;
    atmosphericHumidity: number;
    waterLevel: number;

    selectDisplay: (display: string) => void;
    currentDisplaySelection: string;
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
            return <PowerIcon style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 21.666 && temperatureCelcius <= 23.333) {
            return <PowerIcon  style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 23.333 && temperatureCelcius <= 24.444) {
            return <PowerIcon  style={{color: 'lightblue', marginRight: 10}}/>
        } else if(temperatureCelcius > 24.444 && temperatureCelcius <= 27.777) {
            return <PowerIcon  style={{color: 'yellowgreen', marginRight: 10}}/>
        } else if(temperatureCelcius >  27.777) {
            return <PowerIcon  style={{color: 'red', marginRight: 10}}/>
        } else {
            return <PowerIcon  style={{color: 'grey', marginRight: 10}}/>
        }
    }

    private renderPHIcon() {
        const { temperatureCelcius } = this.props;
        if(temperatureCelcius <= 21.666) {
            return <PowerIcon style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 21.666 && temperatureCelcius <= 23.333) {
            return <PowerIcon  style={{color: 'blue', marginRight: 10}}/>
        } else if(temperatureCelcius > 23.333 && temperatureCelcius <= 24.444) {
            return <PowerIcon  style={{color: 'lightblue', marginRight: 10}}/>
        } else if(temperatureCelcius > 24.444 && temperatureCelcius <= 27.777) {
            return <PowerIcon  style={{color: 'yellowgreen', marginRight: 10}}/>
        } else if(temperatureCelcius >  27.777) {
            return <PowerIcon  style={{color: 'red', marginRight: 10}}/>
        } else {
            return <PowerIcon  style={{color: 'grey', marginRight: 10}}/>
        }
    }
    
    private renderAtmosphericTempIcon() {
        const { atmosphericTemperature } = this.props;
        if(atmosphericTemperature <= 50) {
            return <PowerIcon style={{color: 'blue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 50 && atmosphericTemperature <= 60) {
            return <PowerIcon  style={{color: 'blue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 60 && atmosphericTemperature <= 70) {
            return <PowerIcon  style={{color: 'lightblue', marginRight: 10}}/>
        } else if(atmosphericTemperature > 70 && atmosphericTemperature <= 80) {
            return <PowerIcon  style={{color: 'yellowgreen', marginRight: 10}}/>
        } else if(atmosphericTemperature >  80) {
            return <PowerIcon  style={{color: 'red', marginRight: 10}}/>
        } else {
            return <PowerIcon  style={{color: 'grey', marginRight: 10}}/>
        }
    }

    public render() {
        const { temperatureCelcius, daylightLevels, daylightOn, moonlightLevels, moonlightOn, atmosphericHumidity, atmosphericTemperature, waterLevel } = this.props;
        const temperatureFahrenheit = (temperatureCelcius * 9 / 5 + 32).toFixed(2);
        return(
            <div style={{display: 'flex', flexDirection: 'column', fontSize: '10pt'}}>
                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_TEMPERATURE_DATA)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>{this.renderWaterTempIcon()}Water Temperature</span>
                    <span>{temperatureCelcius + "F / " + temperatureFahrenheit + "C"}</span>   
                </div>

                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_TEMPERATURE_DATA)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>{this.renderPHIcon()}pH</span>
                    <span>{7.0}</span>   
                </div>

                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_LIGHT_CONTROLS)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>
                        <PowerIcon className={daylightOn ? 'on' : 'dark-color-primary-2'} style={{marginRight: 10}} />
                        Illumination
                    </span>
                    <span>{daylightLevels}</span>
                </div>
                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_ATMOSPHERE_DATA)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>
                        <PowerIcon style={{color: 'lightblue', marginRight: 10}} />
                        Humidity
                    </span>
                    <span>{atmosphericHumidity}</span>
                    
                </div>
                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_ATMOSPHERE_DATA)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>{this.renderAtmosphericTempIcon()}Atmospheric Temperature</span>
                    <span>{atmosphericTemperature + "F / " + atmosphericTemperature + "C"}</span>
                </div>
                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_ATMOSPHERE_DATA)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>
                        <PowerIcon style={{color: 'blue', marginRight: 10}} />
                        Evap Rate
                    </span>
                    <span>{waterLevel}</span>
                </div>
                <div className="displayOption" onClick={() => this.props.selectDisplay(DISPLAY_LIVE_FEED)} style={{ margin: 5, display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <span style={{ display: 'flex'}}>
                        <OnDemandVideoIcon className="color-secondary-1-2" style={{marginRight: 10}} />
                        Live Feed
                    </span>
                </div>
                <div 
                    className="displayOption"
                    onClick={() => this.props.selectDisplay(DISPLAY_FAUNA_FLORA)} 
                    style={{ 
                        margin: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ display: 'flex'}}>
                        <ListIcon className="color-secondary-1-2" style={{marginRight: 10}} />
                        Fauna\Flora List
                    </span>
                </div>
                <div 
                    className="displayOption"
                    onClick={() => this.props.selectDisplay(DISPLAY_FAUNA_FLORA)} 
                    style={{ 
                        margin: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}
                >
                    <span style={{ display: 'flex'}}>
                        <ListIcon className="color-secondary-1-2" style={{marginRight: 10}} />
                        Thermodynamics
                    </span>
                </div>
            </div>
        )
    }
}

export default AquariumStatus;