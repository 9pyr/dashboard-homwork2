import './styles/index.scss';

import React from 'react';
import TypeButton from '../typeButton';

export default function CardHead(props) {
  const { dataKey, Max, sum, handleValue, values } = props;
  const a_per = Math.ceil((sum?.a / Max) * 100);
  const b_per = Math.ceil((sum?.b / Max) * 100);

  return (
    <div id="card-head" className="flex wrm-21 wd hrm-3 mb-3 right">
      <TypeButton handleValue={handleValue} values={values} />
      <div
        data-title={a_per + '% จากผู้ติดเชื้ออันดับสูงสุด'}
        className="card flex wrm-6 hrm-3 px-3 mr-2"
      >
        <div className="wrm-3 pt-2">
          <div className="text-overflow wrm-3">{dataKey ? dataKey[0] : ''}</div>
          <div className="mt-6">
            {new Intl.NumberFormat('ja-JP').format(sum?.a)}
          </div>
        </div>

        <div
          className="xx-large flex wd col right middle"
          style={{ textAlign: 'right' }}
        >
          <div className="percent">
            <svg>
              <circle cx="35" cy="36" r="32"></circle>
              <circle
                cx="35"
                cy="36"
                r="32"
                style={{
                  strokeDashoffset: `calc(220 - ((220 * ${a_per}) / 100))`,
                  stroke: '#fbff00',
                }}
              ></circle>
            </svg>
            <div className="number">
              {a_per}
              <span className="x-small">%</span>
            </div>
          </div>
        </div>
      </div>
      <div
        data-title={b_per + '% จากผู้ติดเชื้ออันดับสูงสุด'}
        className="card flex wrm-6 hrm-3 px-3 mr-2"
      >
        <div className="wrm-3 pt-2">
          <div className="text-overflow wrm-3">{dataKey ? dataKey[1] : ''}</div>
          <div className="mt-6">
            {new Intl.NumberFormat('ja-JP').format(sum?.b)}
          </div>
        </div>
        <div
          className="xx-large flex wd col right middle"
          style={{ textAlign: 'right' }}
        >
          <div className="percent">
            <svg>
              <circle cx="35" cy="36" r="32"></circle>
              <circle
                cx="35"
                cy="36"
                r="32"
                style={{
                  strokeDashoffset: `calc(220 - ((220 * ${b_per}) / 100))`,
                  stroke: '#ffee00',
                }}
              ></circle>
            </svg>
            <div className="number">
              {b_per}
              <span className="x-small">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
