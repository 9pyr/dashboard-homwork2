import React, { memo } from 'react';

const FormSelect = (props) => {
  const { dataSource, handleValue, values } = props;

  return (
    <div className="card flex col middle right wrm-21 hrm-3 mt-2 px-4">
      <div className="flex row">
        {/* <div className="flex col mr-2">
          <label htmlFor="country-1">ประเภท</label>
          <select
            value={{ ...values }['type']}
            onChange={handleValue}
            name="type"
            id="type"
            className="wrm-5"
          >
            <option value="cases">ผู้เจ็บป่วย</option>
            <option value="deaths">เสียชีวิต</option>
            <option value="recovered">หายแล้ว</option>
          </select>
        </div> */}
        <div className="flex col mr-2">
          <label htmlFor="country-1">เลือกประเทศ</label>
          <select
            value={{ ...values }['country_1']}
            onChange={handleValue}
            name="country_1"
            id="country-1"
            className="wrm-5"
          >
            {dataSource?.map(
              (val, i) =>
                ({ ...values }['country_1'] !== i && (
                  <option key={i} value={i}>
                    {val.country} {val.province}
                  </option>
                ))
            )}
          </select>
        </div>
        <div className="flex col mr-2">
          <label htmlFor="country-2">เปรียบเทียบ</label>
          <select
            value={{ ...values }['country_2']}
            onChange={handleValue}
            name="country_2"
            id="country-2"
            className="wrm-5"
          >
            {dataSource?.map(
              (val, i) =>
                ({ ...values }['country_2'] !== i && (
                  <option key={i} value={i}>
                    {val.country} {val.province}
                  </option>
                ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default memo(FormSelect);
