import React from 'react';
import { Wave } from '../data/Wave';
import CloseIcon from '@material-ui/icons/Close';

interface WaveControllerProps {
    index: number;
    updateWave: (wave: Wave, index: number) => void;
    removeWave: (index: number) => void;
}

interface WaveControllerState {
    // focused wave properties
    type: string;
    amplitude: string;
    vertical_shift: string;
    period_coefficient: string;
    period: string;
}
class WaveController extends React.Component<WaveControllerProps, WaveControllerState> {
    constructor(props: WaveControllerProps) {
        super(props);
        this.state = {
            type: "SIN",
            amplitude: "180",
            vertical_shift: "30",
            period_coefficient: "480",
            period: "0.5"
        }

        this.changeWaveProperty = this.changeWaveProperty.bind(this);
    }

    private changeWaveProperty(event: { target: { name: string, value: string }}) {
        //@ts-ignore
        this.setState({ [event.target.name]: event.target.value });
    }


    private buildWaveFromState() {
        let newWave = new Wave();
        newWave.type = this.state.type;
        newWave.amplitude = parseFloat(this.state.amplitude);
        newWave.vertical_shift = parseFloat(this.state.vertical_shift);
        newWave.period_coefficient = parseFloat(this.state.period_coefficient);
        newWave.period = parseFloat(this.state.period);
        return newWave;
    }

    public render() {
        return(
            <div style={{display: 'flex'}}>
                <span style={{margin: 5, fontSize: '10pt', width: '16.666%'}}>{"Wave " + this.props.index}</span>
                <span style={{margin: 5, width: '16.666%'}}>
                    <select name="type" onChange={this.changeWaveProperty}  value={this.state.type}>
                        <option value="SIN">Sin</option>
                        <option value="COSINE">Cosine</option>
                    </select>
                </span>
                <span style={{margin: 5, width: '16.666%'}}>
                    <input name="amplitude" onChange={this.changeWaveProperty} value={this.state.amplitude} />
                </span>
                <span style={{margin: 5, width: '16.666%'}}>
                    <input name="vertical_shift" onChange={this.changeWaveProperty} value={this.state.vertical_shift} />
                </span>
                <span style={{margin: 5, width: '16.666%'}}>
                    <input name="period_coefficient" onChange={this.changeWaveProperty} value={this.state.period_coefficient} />
                </span>
                <span style={{margin: 5, width: '16.666%'}}>
                    <input name="period" onChange={this.changeWaveProperty} value={this.state.period} />
                </span>
                <span style={{margin: 5}}>
                    <CloseIcon style={{cursor: 'pointer'}} onClick={() => this.props.removeWave(this.props.index)} />
                </span>
            </div>
        )
    }
}

export default WaveController;