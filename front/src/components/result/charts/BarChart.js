import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

// const data = [
//   { '1950': 2.525 },
//   { '1960': 3.018 },
//   { '1970': 3.682 },
//   { '1980' : 4.440 },
//   // { year: '1990', population: 5.310 },
//   // { year: '2000', population: 6.127 },
//   // { year: '2010', population: 6.930 },
// ];

// {0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}

const data = [
  { select_key: '0', point: 1 },
  { select_key: '1', point: 0 },
  { select_key: '2', point: 3 },
  { select_key: '3', point: 4 },
  { select_key: '4', point: 5 },
  { select_key: '5', point: 6 },
  { select_key: '6', point: 7 },
];

const BarChart = () => {
    return (
      <Paper>
        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="point"
            argumentField="select_key"
          />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
    );
}

export default BarChart;