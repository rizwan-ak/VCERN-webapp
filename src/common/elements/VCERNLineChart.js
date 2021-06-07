import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [{ pv: 2400 }, { pv: 1398 }, { pv: 9800 }, { pv: 3908 }, { pv: 4800 }, { pv: 3800 }, { pv: 4300 }];

export default function VCERNLineChart() {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pv" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
