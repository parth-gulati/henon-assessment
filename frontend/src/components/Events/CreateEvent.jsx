import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateEventForm from './CreateEventForm';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { updateDateTime } from '../../helpers';
import { createEvent, editEvent } from '../../api/eventApi';
import useToken from '../../context/useToken';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
  maxWidth: 800,
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  backdropFilter: 'blur(5px)',
  p: 4,
};

export default function CreateEvent({ open, handleClose, editDetails }) {

  const [loading, setLoading] = useState(false);

  const isEditing = !!editDetails;

  const { token } = useToken();

  const onSubmit = async (data) => {
    const newStartDate = updateDateTime(data.startDate, data.startTime);
    const newEndDate = updateDateTime(data.endDate, data.endTime);
    const eventData = {
      title: data.title,
      type: data.type,
      from: newStartDate,
      to: newEndDate
    }

    setLoading(true);

    if (!isEditing) {
      const { data: resData, status } = await createEvent(eventData, token);
      setLoading(false);
      if (status === 201) {
        toast.success("Event created successfully");
        handleClose();
      } else {
        toast.error(resData.message);
      }
    }
    else {
      const { data: resData, status } = await editEvent(eventData, token);
      setLoading(false);
      if (status === 201) {
        toast.success("Event edited successfully");
        handleClose();
      } else if(status == 200){
        toast.success("No changes done to event")
      }
      
      else {
        toast.error(resData.message);
      }
    }
  }

  return (
    <StyledContainer maxWidth="lg">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditing ? `Edit ${editDetails.title}` : "Create an event"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add the details for the event
          </Typography>
          <CreateEventForm onSubmit={onSubmit} isEditing={isEditing} eventData={editDetails} />
        </Box>
      </Modal>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;  
  `;