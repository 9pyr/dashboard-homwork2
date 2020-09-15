import '../../styles/rated.scss';
import React, { useEffect, createElement } from 'react';

export default function CardRated(props) {
  const { title, dataSource } = props;

  const dots = () => {
    let text = '';
    const dots = document.querySelectorAll('span.dots');
    for (let i = 0; i < 32; i++) {
      text += '<span>&nbsp;.&nbsp</span>';
    }
    dots?.forEach((elem) => {
      elem.innerHTML = text;
    });
  };

  const dotsColor = () => {
    dataSource?.map((val, key) => {
      let lim = Math.floor(
        (32 * ((val.cases / dataSource[0].cases) * 100)) / 100
      );
      document
        .querySelectorAll(
          `#rated-items div:nth-child(${
            key + 1
          }) .dots > span:nth-child(${lim}) ~ span`
        )
        .forEach((ele) => {
          ele.style.color = '#d2d8df40';
        });
    });
  };

  useEffect(() => {
    dots();
    dotsColor();
  }, [dataSource]);

  return (
    <div id="card-rated" className="flex px-2 py-2">
      <div className="card wrm-21 hrm-10 py-4 px-4 round flex col">
        <div id="title" className="mx-2">
          <span className="text-black">{title}</span>
        </div>
        <div id="rated-items">
          {dataSource?.map((val, key) => {
            return (
              <div key={key} className="flex row mx-4 mt-2">
                <div className="dot mr-1"></div>
                <span data-title={val.country} className="text-overflow wrm-3">
                  {val.country}
                </span>
                <span className="dots"></span>
                <span className="wrm-3 flex right">
                  {new Intl.NumberFormat('ja-JP').format(val.cases)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
