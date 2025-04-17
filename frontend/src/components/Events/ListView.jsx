import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { formatDateFromDateObject, formatTimeFromDateObject } from '../../helpers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteEvent } from '../../api/eventApi';
import useToken from '../../context/useToken';

const paginationModel = { page: 0, pageSize: 5 };

const ListView = ({ events, setDeletionOpen, deletionOpen }) => {

    const {token} = useToken();

const columns = [
    { field: 'title', headerName: 'Title' },
    { field: 'type', headerName: 'Type'},
    {
        field: 'fromDate',
        headerName: 'From Date',
        valueGetter: (value, row) => `${formatDateFromDateObject(row.from) || ''}`
    },
    {
        field: 'fromTime',
        headerName: 'From Time',
        valueGetter: (value, row) => `${formatTimeFromDateObject(row.from) || ''}`
    },
    {
        field: 'toDate',
        headerName: 'To Date',
        valueGetter: (value, row) => `${formatDateFromDateObject(row.to) || ''}`
    },
    {
        field: 'toTime',
        headerName: 'To Time',
        valueGetter: (value, row) => `${formatTimeFromDateObject(row.to) || ''}`
    },
    {
        field: 'delete',
        headerName: 'Delete',
        renderCell: (params) => {
            const handleOpen = () => {
                setSelectedRow(params.row);
                setDeletionOpen(true);
            };

            return (
                <Button color="error" onClick={handleOpen}>
                    Delete
                </Button>
            );
        },
    },
];

    const [selectedRow, setSelectedRow] = React.useState(null); 

    const handleDelete = async () => {
        if (selectedRow) {
            const res = await deleteEvent(selectedRow.title, token);
            console.log(res);
            setDeletionOpen(false);
        }
    };

    const handleClose = () => {
        setDeletionOpen(false); 
    };

    const rows = events.map((event, idx) => ({
        id: idx,
        _id: event._id,
        title: event.title,
        type: event.type,
        from: event.from,
        to: event.to,
    }));

    return (
        <Paper sx={{ height: 400, overflowX: 'scroll' }}>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ maxWidth: { xs: 300, sm: 400, md: 500, lg: '100%' }, overflowX: 'scroll' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0, overflowX: 'scroll' }}
                    />
                </Box>
            </Box>
            <Dialog open={deletionOpen} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete the event: <strong>{selectedRow?.title}</strong>?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ListView;
