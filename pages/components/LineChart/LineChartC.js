import '../../../styles/index.scss';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import CardHead from './CardHead';
import List from '../List';

export default function LineChartC(props) {
  const { dataSource, title, dataKey, Max, sum, handleValue, values } = props;

  return (
    <div className="flex px-2 py-2">
      <div className="card wrm-21 py-4 px-4 flex col center start round">
        <div className="flex col center">
          <CardHead
            dataKey={dataKey}
            Max={Max}
            sum={sum}
            handleValue={handleValue}
            values={values}
          />
          <AreaChart
            width={680}
            height={440}
            data={dataSource}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Area
              type="monotone"
              dataKey={dataKey ? dataKey[0] : 0}
              stroke="#bbff00"
              fill="#bbff00"
              activeDot={{ r: 8 }}
            />
            <Area
              type="monotone"
              dataKey={dataKey ? dataKey[1] : 0}
              stroke="#ffa600"
              fill="#ffa600"
            />
          </AreaChart>
          <div className="flex row wd">
            <List
              title={title ? title[0] : ''}
              dataSource={dataSource}
              dataKey={title ? title[0] : ''}
            />
            <List
              title={title ? title[1] : ''}
              dataSource={dataSource}
              dataKey={title ? title[1] : ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
