import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, PieSeries, Title, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const DoughnutChart = ({data})=> {

  const newKey = Object.keys(data);
  const newValue = Object.values(data);
  const newData = []
  for (const key in newValue) {
    newData.push({ select_key:newKey[key], point:newValue[key] })
  }
    return (
      <Paper>
          <Chart
            data={newData}
          >
          <PieSeries
            argumentField="select_key"
            valueField="point"
            innerRadius={0.6}
          />
          <Title
            text="DoughnutChart"
          />
          <Animation />
        </Chart>
      </Paper>
    );
}

export default DoughnutChart;
