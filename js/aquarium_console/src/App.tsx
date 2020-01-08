import React from 'react';
import './App.css';
import './AppDark.css';
import './AppLight.css';
import { FormControlLabel, Grid } from '@material-ui/core';
import { IOSSwitch } from './iosswitch/IosSwitch';
import ControlList from './controlbox/ControlList';
import AquariumStatus from './aquariumstate/AquariumStatus';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';
import LightControl from './lighting/LightControl';

const LIGHT_MODE = "light-mode";
const DARK_MODE = "dark-mode";

const data = [
	{
	  "name": "Page A",
	  "uv": 4000,
	  "pv": 2400,
	  "amt": 2400
	},
	{
	  "name": "Page B",
	  "uv": 3000,
	  "pv": 1398,
	  "amt": 2210
	},
	{
	  "name": "Page C",
	  "uv": 2000,
	  "pv": 9800,
	  "amt": 2290
	},
	{
	  "name": "Page D",
	  "uv": 2780,
	  "pv": 3908,
	  "amt": 2000
	},
	{
	  "name": "Page E",
	  "uv": 1890,
	  "pv": 4800,
	  "amt": 2181
	},
	{
	  "name": "Page F",
	  "uv": 2390,
	  "pv": 3800,
	  "amt": 2500
	},
	{
	  "name": "Page G",
	  "uv": 3490,
	  "pv": 4300,
	  "amt": 2100
	}
]
	
interface AppState {
	mode: string;
}

class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			mode: LIGHT_MODE
		}
		
		this.changeAppColorMode = this.changeAppColorMode.bind(this);
	}

	componentDidMount() {
		let todaysDate = new Date();
	}

	private changeAppColorMode() {
		const { mode } = this.state;
		if(mode === LIGHT_MODE) {
			this.setState({ mode: DARK_MODE });
		} else {
			this.setState({ mode: LIGHT_MODE });
		}
	}

	public render() {
		const { mode } = this.state;
		return (
			<div className="App">
				<div className={mode === DARK_MODE ? DARK_MODE : LIGHT_MODE}>
					<div id="main-header">
						<h4>Aquarium Command Console</h4>
						<FormControlLabel
							control={
								<IOSSwitch
									checked={mode === DARK_MODE}
									onChange={this.changeAppColorMode}
								/>
							}
							label="Dark Mode"
						/>
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
								/>
								<LightControl />
							</Grid>
							<Grid item xs={9} className="color-secondary-1-2">
								<LineChart width={830} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line type="monotone" dataKey="pv" stroke="#8884d8" />
									<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
								</LineChart>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		)
	}
	
}

export default App;
