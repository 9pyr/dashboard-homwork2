import '../../styles/typebtn.scss';
import React, { useEffect, useRef } from 'react';

export default function TypeButton(props) {
  const unmounted = useRef(false);
  const { handleValue, values } = props;

  useEffect(() => {
    if (!unmounted.current) {
      const type = document.querySelector(`.btn-line [value=${values.type}]`);
      const types = document.querySelectorAll(`.btn-line button`);
      types?.forEach((ele) => {
        if (ele.contains(type)) {
          type?.classList.add('is-active');
        } else {
          ele?.classList.remove('is-active');
        }
      });
      unmounted.current = true;
    }

    return () => (unmounted.current = false);
  }, [values?.type]);

  return (
    <div id="TypeBtn" className="flex px-2">
      <div className="card-content py-4 px-4 flex col center start round">
        <div className="pb-2">{values?.type}</div>
        <div className="flex row center btn-line">
          <button
            data-title="ผู้เจ็บป่วย"
            value="cases"
            name="type"
            onClick={handleValue}
            className="btn fab"
          >
            C
          </button>
          <button
            data-title="ผู้เสียชีวิต"
            value="deaths"
            name="type"
            onClick={handleValue}
            className="btn fab"
          >
            D
          </button>
          <button
            data-title="ผู้ที่รักษาหาย"
            value="recovered"
            name="type"
            onClick={handleValue}
            className="btn fab"
          >
            R
          </button>
        </div>
      </div>
    </div>
  );
}
