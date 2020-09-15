import '../../styles/preview.scss';

import React, { useState, useEffect } from 'react';

export default function CardPreview(props) {
  const [max, setMax] = useState(0);
  const { bg, title, dataSource } = props;

  const findMax = () => {
    let Max = -999;
    dataSource?.map((val, index) => {
      if (val.value > Max) {
        Max = val.value;
      }
      if (index === dataSource.length - 1) setMax(Max);
    });
  };

  useEffect(() => {
    findMax();
  }, [dataSource, max]);

  return (
    <div id="card-preview" className="flex px-2 py-2">
      <div
        style={{ background: bg }}
        className="card wrm-21 hrm-4 py-4 px-4 round flex col"
      >
        <div className="text-white x-large">{title}</div>
        <div className="flex wd hg row">
          <div className="flex left start larger text-white wrm-8 mt-1 ml-2">
            ยอดสูงสุด: {new Intl.NumberFormat('ja-JP').format(max)}
          </div>
          <div id="chart-preview" className="flex wd hg right">
            {dataSource?.map((val, key) => (
              <div
                key={key}
                data-tooltip={`${val.month} (${new Intl.NumberFormat(
                  'ja-JP'
                ).format(val.value)})`}
                className="chart-item"
                style={{
                  height: `${Math.floor(
                    (val.value / (max + max / 3)) * 120
                  )}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
