import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DryWeightForm from './forms/DryWeightForm';
import WaterUptakeForm from './forms/WaterUptakeForm';
import SolutionForm from './forms/SolutionForm';
import ImageForm from './forms/ImageForm';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function InsertData(){
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Images" {...a11yProps(0)} />
              <Tab label="Dry Weight" {...a11yProps(1)} />
              <Tab label="Solution" {...a11yProps(2)} />
              <Tab label="Water Uptake" {...a11yProps(3)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={1}>
              <DryWeightForm/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SolutionForm/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <WaterUptakeForm/>
            </TabPanel>
            <TabPanel value={value} index={0}>
              <ImageForm/>
            </TabPanel>
        </>
    )
}