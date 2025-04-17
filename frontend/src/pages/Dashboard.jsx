import React, { useState } from 'react';
import { Typography, Container, Button, Box, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';
import CreateEvent from '../components/Events/CreateEvent';
import EventTabs from '../components/Events/EventTabs';

const Dashboard = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  return (
    <StyledContainer>
      <Typography variant="h4">Dashboard</Typography>
      <StyledBox>
        <Tabs indicatorColor='secondary' textColor='secondary' value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="List View" {...a11yProps(0)} />
          <Tab label="Timeline View" {...a11yProps(1)} />
        </Tabs>
        <Button variant="contained" color="primary" onClick={handleOpen}>Create Event</Button>
      </StyledBox>
      <CreateEvent open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
`

export default Dashboard;