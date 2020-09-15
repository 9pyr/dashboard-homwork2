import '../../styles/index.scss';
import '../../styles/pie.scss';

import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

export default function PieChartC(props) {
  const { data, dataKey, title } = props;
  const COLORS = [
    '#ff1515',
    '#00C49F',
    '#ffc115',
    '#c1ff15',
    '#34ff15',
    '#15ffad',
    '#15ffad',
    '#15fff7',
    '#157eff',
    '#1534ff',
    '#a115ff',
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="flex px-2 py-2">
      <div className="card wrm-10 hrm-9 py-4 px-4 round flex center col">
        <div className="flex center">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={95}
              cy={100}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        {title}
      </div>
    </div>
  );
}
