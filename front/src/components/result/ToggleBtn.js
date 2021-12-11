import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleBtn = ({ chartState, setChartState, toggleValue }) => {
  const handleChange = (event) => setChartState(event.target.value);

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={chartState}
        exclusive
        onChange={handleChange}
      >
        {toggleValue.map(v=><ToggleButton value={v}>{v}</ToggleButton>)}
      </ToggleButtonGroup >
    </>
  );
}

export default ToggleBtn;