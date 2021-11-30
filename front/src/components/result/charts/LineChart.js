import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const LineChart = ({data}) => {
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
          <ArgumentAxis tickFormat={() => tick => tick} />
          <ValueAxis
            max={50}
          />

          <LineSeries
            name="객관식"
            argumentField="select_key"
            valueField="point"
          />

          <Legend position="bottom" />
          <Title
            text={`Line Chart`}
          />
          <Animation />
        </Chart>
      </Paper>
    );
}

export default LineChart;