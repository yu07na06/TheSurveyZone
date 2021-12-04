import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Grid } from '@mui/material';

const ToggleBtn = ({ chartState, setChartState }) => {

  const handleChange = (event, newAlignment) => {
    console.log("클릭 이벤트 발생!!? : ", event.target.value);
    console.log("클릭 이벤트 발생!!? : ", newAlignment);
    setChartState(event.target.value);
    chartState && console.log("chartState", chartState);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={chartState}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="BarChart">Bar</ToggleButton>
        <ToggleButton value="DoughnutChart">Doughnut</ToggleButton>
        <ToggleButton value="LineChart">Line</ToggleButton>
      </ToggleButtonGroup >
    </>
  );
}

export default ToggleBtn;


// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// const ToggleBtn = () => {
//   const [chartMenu, setChartMenu] = React.useState('web');

//   const handleChange = (event, newAlignment) => {
//     console.log("클릭 이벤트 발생!!? : ", event.target.value);
//     setChartMenu(newAlignment);
//   };

//   return (
//     <ToggleButtonGroup
//       color="primary"
//       value={chartMenu}
//       exclusive
//       onChange={handleChange}
//     >
//       <ToggleButton value="BarChart">BarChart</ToggleButton>
//       <ToggleButton value="DoughnutChart">DoughnutChart</ToggleButton>

//     </ToggleButtonGroup>
//   );
// }

// export default ToggleBtn;