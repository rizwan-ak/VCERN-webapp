import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [{ pv: 4 }, { pv: 5 }, { pv: 3 }, { pv: 4 }];
const colors = ['#000000', '#FE9900', '#C90000', '#1DD1A1'];

const customLabel = (value, entry) => {
    const { color, payload } = entry;
    const { pv } = payload;
    return <span style={{ color }}>{pv}</span>;
};

export default function VCERNPieChart() {
    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <h3>Chart of PU x UV</h3>
                    <Tooltip />
                    <Legend verticalAlign="middle" iconType="circle" align="right" layout="vertical" formatter={customLabel} />
                    <Pie data={data} dataKey="pv" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={0} title="Chart of PU x UV">
                        {data.map((entry, idx) => (
                            <Cell key={idx} fill={colors[idx]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
