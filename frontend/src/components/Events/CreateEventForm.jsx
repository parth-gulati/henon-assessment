//CreateEventForm.jsx - this file is a React component that renders a form for
// creating or editing events.

import { TextField, Button, MenuItem } from "@mui/material";
import Grid from '@mui/material/GridLegacy';

import { useForm, Controller, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import React from "react";
import { convertTo24Hour, parseDate } from "../../helpers";


// statically defined for now, but can be dynamic in future

import { EVENT_TYPES } from "../../helpers";

// This function generates an array of time options in 30-minute intervals
// for a 24-hour format. It creates 48 options, each representing a half-hour increment.
// The time is formatted as "HH:MM" and the label is formatted as "HH:MM AM/PM".
const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const min = i % 2 === 0 ? "00" : "30";
    return {
        label: `${hour % 12 === 0 ? 12 : hour % 12}:${min} ${hour < 12 ? "AM" : "PM"}`,
        value: `${hour}:${min}`,
    };
});

// This schema defines the validation rules for the form fields using Yup.
// Each field is required and has specific validation rules.
// The 'type' field must be one of the predefined event types.
// The 'startDate' and 'endDate' fields must be valid dates.
// The 'startTime' and 'endTime' fields must be valid time strings.
// The 'endDate' must be greater than or equal to the 'startDate'.
// The 'endTime' must be greater than or equal to the 'startTime'.
// The 'startDate' and 'endDate' fields are validated using the 'date' method from Yup.
// The 'startTime' and 'endTime' fields are validated using the 'string' method from Yup.

const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required(
        "Type is required"
    ).oneOf(EVENT_TYPES, "Invalid event type"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
});

const CreateEventForm = ({ onSubmit, eventData, isEditing }) => {
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: isEditing ? eventData.title : "",
            type: isEditing ? eventData.type : "",
            startDate: isEditing ? parseDate(eventData.startDate) : null,
            endDate: isEditing ? parseDate(eventData.endDate) : null,
            startTime: isEditing ?  convertTo24Hour(eventData.startTime) : "",
            endTime: isEditing ? convertTo24Hour(eventData.endTime) : "",
          }          
    });

    const startTime = useWatch({ control, name: "startTime" });
    const endTime = useWatch({ control, name: "endTime" });
    const startDate = useWatch({ control, name: "startDate" });
    const endDate = useWatch({ control, name: "endDate" });

    useEffect(() => {
        if (!startDate || !endDate) return;
    
        if (startDate > endDate) {
            setValue("endDate", startDate);
            trigger("endDate");
        }
    
        if (startDate.getTime() === endDate.getTime() && startTime) {
            const startIdx = timeOptions.findIndex((t) => t.value === startTime);
            const endIdx = timeOptions.findIndex((t) => t.value === endTime);
    
            if (startIdx !== -1 && (endIdx === -1 || endIdx <= startIdx)) {
                const nextTime = timeOptions[startIdx + 1]?.value || timeOptions[startIdx].value;
                setValue("endTime", nextTime);
                trigger("endTime");
            }
        }
    }, [startTime, endTime, startDate, endDate, setValue, trigger]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Grid container spacing={2} style={{width: "100%"}}>
                <Grid item xs={12} md={12} lg={12} style={{marginTop: '20px'}}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                label="Title"
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                select
                                label="Type"
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {EVENT_TYPES.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                disablePast
                                label="Start Date"
                                {...field}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        {...params}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                disablePast
                                label="End Date"
                                {...field}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        {...params}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="startTime"
                        defaultValue=""
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                select
                                label="Start Time"
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {timeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Controller
                        name="endTime"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                select
                                label="End Time"
                                {...field}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {timeOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                        {isEditing ? "Edit Event" :  "Create Event"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateEventForm;
