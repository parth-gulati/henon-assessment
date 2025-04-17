import React, { useState } from 'react';
import { Typography, Container, Button, Box, Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';
import CreateEvent from '../components/Events/CreateEvent';
import { useEffect } from "react"
import { getEvents } from "../api/eventApi"
import useToken from '../context/useToken'
import ListView from '../components/Events/ListView';

const Dashboard = () => {

  const [open, setOpen] = React.useState(false); 
  const [events, setEvents] = useState([]);
  const [value, setValue] = React.useState(0);
  const [deletionOpen, setDeletionOpen] = useState(false);
  const [editDetails, setEditDetails] = useState(null);

  const { token } = useToken();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!open) {
        console.log(editDetails)
        setEditDetails(null);
        const { data, status } = await getEvents(token);
        if (status === 200) {
          setEvents(data.data.events);
        } else {
          toast.error("Error fetching events");
        }
      }
    }
    fetchEvents();
  }, [open, deletionOpen])

  useEffect(()=>{
    if(!!editDetails){
      setOpen(true)
    }

  }, [editDetails])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <StyledContainer>
        {value === 0 && <ListView events={events} setEditDetails={setEditDetails} deletionOpen={deletionOpen} setDeletionOpen={setDeletionOpen} />}
      </StyledContainer>
      <CreateEvent open={open} handleClose={handleClose} setEditDetails={setEditDetails} editDetails={editDetails} handleOpen={handleOpen} />
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