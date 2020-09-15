import '../styles/index.scss';
import response from './datas/response.json';

import React, { useState, useEffect } from 'react';
import LineChartC from './components/LineChart/LineChartC';
// import PieChartC from './components/PieChartC';
import Header from './components/Header';
import FormSelect from './components/FormSelect';
import CardRated from './components/CardRated';
import CardPreview from './components/CardPreview';

const initialState = {
  type: 'cases',
  country_1: '0',
  country_2: '1',
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function Home() {
  const [playCase, setPlayCase] = useState(false);
  const [values, setValues] = useState(initialState);
  const [valuesCase, setValuesCase] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCase, setDataSourceCase] = useState({
    cases: [],
    deaths: [],
    recovered: [],
  });
  const [newDataSource, setNewDataSource] = useState([]);
  const [sum_all, setSum_All] = useState({ a: 0, b: 0 });
  const [maxData, setMaxData] = useState(0);

  const handleMax = () => {
    let Max = -999;
    response.map((res, i) => {
      let sum = 0;
      const toArr = JSON.stringify(response[i].timeline[values.type])
        .replace(/{|}/g, '')
        .split(',');
      toArr.map((val) => {
        sum += parseInt(val.split(':')[1]);
      });
      if (sum > Max) {
        Max = sum;
      }
      if (i === response.length - 1) {
        setMaxData(Max);
      }
    });
  };

  const handleDataSort = async () => {
    let newData = new Array();
    await response.map(async (res, i) => {
      let obj = Object.assign({});
      let sum = 0;
      const toArr = JSON.stringify(response[i].timeline[values.type])
        .replace(/{|}/g, '')
        .split(',');
      await toArr.map((val) => {
        sum += parseInt(val.split(':')[1]);
      });
      obj.country = res.country + (res.province ? ` (${res.province})` : '');
      obj.cases = sum;
      newData.push(obj);
      return newData;
    });
    newData.sort((a, b) => b.cases - a.cases);
    setNewDataSource([...newData.slice(0, 10)]);
  };

  const handleData = (value) => {
    if (value?.country_1 && value?.country_2) {
      const tmp1 = cut(value.country_1);
      const tmp2 = cut(value.country_2);
      const sum1 = summary(tmp1);
      const sum2 = summary(tmp2);

      const arr = [];

      setSum_All({ a: sum1.sum, b: sum2.sum });
      sum1.arr.map((val, i) => {
        arr.push({
          name: months[i],
          [response[value.country_1].country]: val,
          [response[value.country_2].country]: sum2.arr[i],
        });
      });
      setDataSource(() => {
        return [...arr];
      });
    }
  };

  const handleDataCase = () => {
    const cases = cutCase(valuesCase, 'cases');
    const deaths = cutCase(valuesCase, 'deaths');
    const recovered = cutCase(valuesCase, 'recovered');
    const sumCases = summary(cases);
    const sumDeaths = summary(deaths);
    const sumRecovered = summary(recovered);

    const arrCase = [];
    const arrDeaths = [];
    const arrRecovered = [];

    sumCases?.arr?.map((val, i) => {
      arrCase.push({
        month: months[i],
        value: val,
      });
    });
    sumDeaths?.arr?.map((val, i) => {
      arrDeaths.push({
        month: months[i],
        value: val,
      });
    });
    sumRecovered?.arr?.map((val, i) => {
      arrRecovered.push({
        month: months[i],
        value: val,
      });
    });

    setDataSourceCase(() => {
      return {
        cases: [...arrCase],
        deaths: [...arrDeaths],
        recovered: [...arrRecovered],
      };
    });
  };

  const cutCase = (index, type) => {
    const toArr = JSON.stringify(response[index].timeline[type])
      .replace(/{|}/g, '')
      .split(',');
    const tmp = [];
    toArr?.map((val) => {
      tmp.push(
        val
          .slice(0, val.indexOf('/'))
          .concat(val.slice(val.lastIndexOf('/'), val.length))
      );
    });
    return tmp;
  };

  const cut = (country) => {
    const toArr = JSON.stringify(response[country].timeline[values.type])
      .replace(/{|}/g, '')
      .split(',');
    const tmp = [];
    toArr?.map((val) => {
      tmp.push(
        val
          .slice(0, val.indexOf('/'))
          .concat(val.slice(val.lastIndexOf('/'), val.length))
      );
    });
    return tmp;
  };

  const summary = (tmp) => {
    let sumAll = 0;
    let sum = 0;
    const arr = [];
    for (let i = 0; i < 12; i++) {
      tmp?.map((val) => {
        if (val.indexOf(i + 1 + '/') !== -1) {
          const hold = parseInt(val.split(':')[1]);
          sum += hold;
          sumAll += hold;
        }
      });
      arr.push(sum);
      sum = 0;
    }
    return { arr: arr, sum: sumAll };
  };

  const handleValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValueCase = (e) => {
    setValuesCase(e.target.value);
  };

  useEffect(() => {
    handleMax();
  }, []);

  useEffect(() => {
    handleDataCase();
  }, [valuesCase]);

  useEffect(() => {
    handleData(values);
    handleDataSort();
  }, [values]);

  useEffect(() => {
    let timer;
    if (playCase) {
      timer = setInterval(() => {
        if (valuesCase < response.length) {
          setValuesCase(valuesCase + 1);
        } else {
          setValuesCase(0);
        }
      }, 500);
    } else clearInterval(timer);

    return () => clearInterval(timer);
  }, [valuesCase, playCase]);

  return (
    <div className="app body hg-10 container">
      <Header />
      <div className="flex flex-wrap px-3">
        <div className="flex col center">
          <FormSelect
            handleValue={handleValue}
            values={values}
            dataSource={response}
          />
          <LineChartC
            sum={sum_all}
            Max={maxData}
            dataKey={[
              response[values.country_1]?.country,
              response[values.country_2]?.country,
            ]}
            title={[
              response[values.country_1]?.country
                ? response[values.country_1]?.country
                : '',
              response[values.country_2]?.country
                ? response[values.country_2]?.country
                : '',
            ]}
            dataSource={dataSource}
            handleValue={handleValue}
            values={values}
          />
        </div>
        <div className="flex col wrm-23">
          <div className="flex row wd">
            <CardRated title={'อันดับ (TOP 10)'} dataSource={newDataSource} />
          </div>
          <div className="flex row wd">
            <div className="flex px-2 py-2">
              <div className="card wrm-21 py-4 px-4 round flex row middle left">
                <div>
                  <select
                    name="all"
                    id="all"
                    value={valuesCase}
                    onChange={handleValueCase}
                    className="flex wrm-8"
                    disabled={playCase}
                  >
                    {response?.map((val, i) => (
                      <option key={i} value={i}>
                        {val.country} {val.province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-1">
                  <label htmlFor="check" className="fab-minimal bg-primary">
                    {playCase ? '◼' : '▷'}
                  </label>
                  <input
                    id="check"
                    type="checkbox"
                    onClick={() => setPlayCase(!playCase)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex row wd">
            <CardPreview
              title={'Cases'}
              bg="#ffc115e0"
              dataSource={dataSourceCase?.cases}
            />
          </div>
          <div className="flex row wd">
            <CardPreview
              title={'Deaths'}
              bg="#ff1515e0"
              dataSource={dataSourceCase?.deaths}
            />
          </div>
          <div className="flex row wd">
            <CardPreview
              title={'Recovered'}
              bg="#157eff"
              dataSource={dataSourceCase?.recovered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
