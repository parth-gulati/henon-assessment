import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/dist/style.css'
import 'react-calendar-timeline/dist/Timeline.scss'
import moment from 'moment'
import { GROUP_MAPPING, GROUPS, EVENT_TYPES } from '../../helpers'
import './timeline.scss'
import { useEffect, useState, useMemo } from 'react'
import { editEvent } from '../../api/eventApi'
import useToken from '../../context/useToken'
import { toast } from 'react-toastify';
import { Tab, Box } from '@mui/material';

const CalendarView = ({ events, setEvents }) => {
  const [groups] = useState(GROUPS)
  const [selectedGroupIds, setSelectedGroupIds] = useState(GROUPS.map(g => g.id))
  const [items, setItems] = useState([])
  const { token } = useToken();

  useEffect(() => {
    setItems(events.map((event, idx) => ({
      id: event._id,
      group: GROUP_MAPPING[event.type],
      title: event.title,
      start_time: moment(event.from),
      end_time: moment(event.to),
    })))
  }, [events])

  const defaultTimeStart = moment().startOf("day").toDate();
  const defaultTimeEnd = moment().startOf("day").add(7, "day").toDate();

  const handleItemMove = async (itemId, dragTime, newGroupOrder) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const duration = moment(item.end_time).diff(moment(item.start_time));
    const newStartTime = moment(dragTime);
    const newEndTime = moment(dragTime).add(duration);
    const newType = EVENT_TYPES[newGroupOrder];

    try {
      const res = await editEvent({
        title: item.title,
        type: newType,
        from: newStartTime.toISOString(),
        to: newEndTime.toISOString()
      }, token);

      if (res.status === 200 || res.status === 201) {
        setEvents(prevEvents =>
          prevEvents.map(ev =>
            ev.title === item.title
              ? { ...ev, from: newStartTime.toISOString(), to: newEndTime.toISOString(), type: newType }
              : ev
          )
        );
        toast.success("Successfully moved event");
      } else {
        console.error("Failed to move event", res.data);
        toast.error(res.data.message || res.data.msg);
      }
    } catch (error) {
      console.error("Failed to move event", error);
      toast.error("Failed to move event");
    }
  };

  const itemRenderer = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const groupColors = {
      1: "#678DC6",
      2: "#9D9DCC",
      3: "#575799",
      4: "#182F52"
    };

    const backgroundColor = groupColors[item.group] || "#ccc";
    const borderColor = itemContext.resizing ? "red" : "#999";
    const isActive = itemContext.selected || itemContext.dragging;

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: "#fff",
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1,
            opacity: isActive ? 0.8 : 1,
            transform: isActive ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.1s ease, opacity 0.1s ease",
          },
        })}
      >
        {itemContext.useResizeHandle && <div {...leftResizeProps} />}
        <div style={{
          height: itemContext.dimensions.height,
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle && <div {...rightResizeProps} />}
      </div>
    );
  };

  const onItemResize = async (itemId, time, edge) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newStartTime = edge == "left" ? moment(time) : moment(item.start_time);
    const newEndTime = edge == "right" ? moment(time) : moment(item.end_time);
    const newType = EVENT_TYPES[item.group-1];
    try {
      const res = await editEvent({
        title: item.title,
        type: newType,
        from: newStartTime.toISOString(),
        to: newEndTime.toISOString()
      }, token);

      if (res.status === 200 || res.status === 201) {
        setEvents(prevEvents =>
          prevEvents.map(ev =>
            ev.title === item.title
              ? { ...ev, from: newStartTime.toISOString(), to: newEndTime.toISOString(), type: newType }
              : ev
          )
        );
        toast.success("Successfully resized event");
      } else {
        console.error("Failed to resize event", res.data);
        toast.error(res.data.message || res.data.msg);
      }
    } catch (error) {
      console.error("Failed to resize event", error);
      toast.error("Failed to resize event");
    }

  }


  const visibleGroups = useMemo(
    () => groups.filter(g => selectedGroupIds.includes(g.id)),
    [selectedGroupIds, groups]
  );

  const visibleItems = useMemo(
    () => items.filter(i => selectedGroupIds.includes(i.group)),
    [selectedGroupIds, items]
  );

  const handleToggleGroup = (groupId) => {
    setSelectedGroupIds(prev => {
      if (prev.includes(groupId)) {
        // Prevent removing the last selected group
        if (prev.length === 1)
          { 
            toast.error("At least one group must be selected");
            return prev;
          }
        return prev.filter(id => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {groups.map(group => (
          <Tab
            key={group.id}
            label={group.title}
            onClick={() => handleToggleGroup(group.id)}
            sx={{
              minHeight: 36,
              borderRadius: 2,
              px: 2,
              bgcolor: selectedGroupIds.includes(group.id) ? 'black' : 'grey.300',
              color: selectedGroupIds.includes(group.id) ? '#ffffff' : 'black',
              '&:hover': {
                bgcolor: selectedGroupIds.includes(group.id) ? 'primary.dark' : 'grey.400'
              }
            }}
          />
        ))}
      </Box>

      <Timeline
        groups={visibleGroups}
        minZoom={1000 * 60 * 15}
        items={visibleItems}
        lineHeight={50}
        defaultTimeStart={defaultTimeStart}
        itemRenderer={itemRenderer}
        canMove={true}
        canResize="both"
        onItemResize={onItemResize}
        onItemMove={handleItemMove}
        defaultTimeEnd={defaultTimeEnd}
      />
    </>
  )
}

export default CalendarView;
