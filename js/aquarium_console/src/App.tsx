import React from 'react';
import './App.css';
import './AppDark.css';
import './AppLight.css';
import { FormControlLabel, Grid } from '@material-ui/core';
import { IOSSwitch } from './iosswitch/IosSwitch';
import AquariumStatus from './aquariumstate/AquariumStatus';
import { getDaylightData } from './functions/DaylightAPI';

import SunIcon from '@material-ui/icons/Brightness1';
import MoonIcon from '@material-ui/icons/Brightness3';
import { tempData } from './data/TestData';
import { DISPLAY_LIGHT_CONTROLS, DISPLAY_FAUNA_FLORA, DISPLAY_TEMPERATURE_DATA, DISPLAY_ATMOSPHERE_DATA } from './displays/DIsplayModes';
import TemperatureDisplay from './displays/TemperatureDisplay';
import FaunaFloraDisplay from './displays/FaunaFloraDisplay';
import LightControl from './displays/LightControl';
import AtmosphereDisplay from './displays/AtmosphereDisplay';

const LIGHT_MODE = "light-mode";
const DARK_MODE = "dark-mode";



	
interface AppState {
	mode: string;
	latitude: number;
	longitude: number;
	display: string;
}

class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			mode: DARK_MODE,
			latitude: 33.4942,
			longitude: -111.9261,
			display: DISPLAY_LIGHT_CONTROLS
		}
		
		this.changeAppColorMode = this.changeAppColorMode.bind(this);
		this.changeDisplay = this.changeDisplay.bind(this);
	}

	componentDidMount() {
		
	}

	private changeAppColorMode() {
		const { mode } = this.state;
		if(mode === LIGHT_MODE) {
			this.setState({ mode: DARK_MODE });
		} else {
			this.setState({ mode: LIGHT_MODE });
		}
	}

	private changeDisplay(displayOption: string) {
		this.setState({ display: displayOption });
	}

	public render() {
		const { mode, display } = this.state;
		let todaysDate = new Date();

		return (
			<div className="App">
				<div className={mode === DARK_MODE ? DARK_MODE : LIGHT_MODE}>
					<div id="main-header">
						<div style={{display: 'flex', fontSize: '12pt', flexDirection: 'column'}}>
							<span>AquaOS</span>
							<span>{todaysDate.toLocaleString()}</span>
						</div>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<FormControlLabel
								control={
									<IOSSwitch
										checked={mode === DARK_MODE}
										onChange={this.changeAppColorMode}
									/>
								}
								label=""
								style={{ marginRight: 10 }}
							/>
							{
								mode === DARK_MODE ?
								<MoonIcon style={{color: 'white'}} />
								:
								<SunIcon style={{color: 'yellow'}} />
							}
						</div>
						
					</div>
					<div style={{padding: 15}}>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<AquariumStatus 
									temperatureCelcius={25.01}
									daylightOn={true}
									daylightLevels={196}
									moonlightOn={false}
									moonlightLevels={0}
									atmosphericTemperature={68}
									atmosphericHumidity={45.3}
									waterLevel={11}
									selectDisplay={this.changeDisplay}
									currentDisplaySelection={display}
								/>
							</Grid>
							<Grid item xs={9} className="color-secondary-1-2">
								{ display === DISPLAY_TEMPERATURE_DATA && <TemperatureDisplay /> }
								{ display === DISPLAY_LIGHT_CONTROLS && 
									<LightControl 
										latitude={this.state.latitude}
										longitude={this.state.longitude}
									/> 
								}
								{ display === DISPLAY_ATMOSPHERE_DATA && <AtmosphereDisplay /> }
								{ display === DISPLAY_FAUNA_FLORA && <FaunaFloraDisplay /> }

							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		)
	}
	
}

export default App;
