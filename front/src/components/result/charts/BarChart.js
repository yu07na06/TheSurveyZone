import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const BarChart = ({data}) => {
  
  // chart에 필요한 data는 [{key:key, key:value},{key:key, key:value},{key:key, key:value}...] 모양이 필요하기에 프론트인 우리께서 특별히 데이터를 가공했다.
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
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries
          valueField="point"
          argumentField="select_key"
        />
        <Title text="BarChart" />
        <Animation />
      </Chart>
    </Paper>
  );
}

export default BarChart;