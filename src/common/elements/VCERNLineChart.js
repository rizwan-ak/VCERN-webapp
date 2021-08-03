import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function VCERNLineChart({ data }) {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis dataKey="number" />
                    <Tooltip />
                    <Line type="monotone" dataKey="number" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
