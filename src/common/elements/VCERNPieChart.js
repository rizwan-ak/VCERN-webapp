import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useWindowDims } from "../../utils/useWindowDims";
const customLabel = (value, entry) => {
  return <span>{`${value}: ${entry?.payload?.value ?? ""}`}</span>;
};

export default function VCERNPieChart({ data }) {
  const { width } = useWindowDims();
  const isVertical = width <= 1060;
  return (
    <div style={{ width: "100%", height: 300, position: "relative" }} id="myID">
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          {/* <Legend verticalAlign="bottom" iconType="circle" align="center" layout="horizontal" formatter={customLabel} /> */}
          <Legend
            verticalAlign={isVertical ? "bottom" : "middle"}
            iconType="circle"
            align={isVertical ? "center" : "right"}
            layout={isVertical ? "horizontal" : "vertical"}
            formatter={customLabel}
          />
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
          >
            {data.map(({ color }, idx) => (
              <Cell key={idx} fill={color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* <div style={{ position: 'absolute', top: 125, left: width / 2 - 100 }}>asdfsfa</div> */}
    </div>
  );
}
