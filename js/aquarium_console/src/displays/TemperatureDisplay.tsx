import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';
import { tempData } from '../data/TestData';

interface TemperatureDisplayProps {}
interface TemperatureDisplayState {}

class TemperatureDisplay extends React.Component<TemperatureDisplayProps, TemperatureDisplayState> {
    public render() {
        return(
            <LineChart width={830} height={400} data={tempData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis dataKey="temp" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
            </LineChart>
        )
    }
}

export default TemperatureDisplay;