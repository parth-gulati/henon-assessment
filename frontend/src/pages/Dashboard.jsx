import React, { useState } from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import styled from '@emotion/styled';
import CreateEvent from '../components/Events/CreateEvent';

const Dashboard = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledContainer>
      <Typography variant="h4">Dashboard</Typography>
      <StyledBox>
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