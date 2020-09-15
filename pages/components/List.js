import '../../styles/list.scss';

import React from 'react';

export default function List(props) {
  const { title, dataSource, dataKey } = props;
  return (
    <div className="flex wd px-1 py-2">
      <div id="list" className="card wd hrm-8 py-4 px-4 round flex col">
        <div id="title" className="mx-2">
          <span>{title}</span>
          <span className="small">&ensp;(เดือน : ราย)</span>
        </div>
        <div id="list-body" className="flex center start col px-4">
          {dataSource?.map((item, inx) => (
            <div key={inx} className="list-item flex row wd px-2 py-2">
              <div className="wd-50">{item?.name}</div>
              <div className="flex wd-50 right">
                {new Intl.NumberFormat('ja-JP', {
                  maximumSignificantDigits: 3,
                }).format(item?.[dataKey])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
