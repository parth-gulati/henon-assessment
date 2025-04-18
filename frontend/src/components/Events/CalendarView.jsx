import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/dist/style.css'
import 'react-calendar-timeline/dist/Timeline.scss'
import moment from 'moment'
import { EVENT_TYPES, GROUP_MAPPING, GROUPS } from '../../helpers'
import './timeline.scss'
import { useEffect, useState } from 'react'

const CalendarView = ({ events }) => {

  const [groups, setGroups] = useState(GROUPS)
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(events.map((event, idx) => ({
      id: idx,
      group: GROUP_MAPPING[event.type],
      title: event.title,
      start_time: moment(event.from),
      end_time: moment(event.to),
      className: `group-1`,

    })))
  }, [])

  const defaultTimeStart = moment()
    .startOf("week")
    .toDate();
  const defaultTimeEnd = moment()
    .startOf("week")
    .add(7, "day")
    .toDate();

    const handleItemMove = (itemId, dragTime, newGroupOrder) => {
      console.log("Item moved", itemId, dragTime, newGroupOrder);
      console.log(moment(dragTime).format("YYYY-MM-DD HH:mm:ss"));
    };

    const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
      const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    
      // Define background colors per group
      const groupColors = {
        1: "#678DC6",
        2: "#9D9DCC",
        3: "#575799",
        4: "#182F52"
      };
    
      const baseColor = groupColors[item.group] || "#ccc";
    
      const backgroundColor = baseColor;
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
              transform: isActive ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.1s ease, opacity 0.1s ease",
            },
            onMouseDown: () => {
              console.log("Clicked item", item);
            }
          })}
        >
          {itemContext.useResizeHandle && <div {...leftResizeProps} />}
          <div
            style={{
              height: itemContext.dimensions.height,
              overflow: "hidden",
              paddingLeft: 3,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {itemContext.title}
          </div>
          {itemContext.useResizeHandle && <div {...rightResizeProps} />}
        </div>
      );
    };    
    

  return (
    <Timeline
      groups={groups}
      minZoom={1000 * 60 * 15}
      items={items}
      lineHeight={50}
      defaultTimeStart={defaultTimeStart}
      itemRenderer={itemRenderer}
      canMove={true}
      canResize="both"
      onItemMove={handleItemMove}
      defaultTimeEnd={defaultTimeEnd}
    />

  )
}

export default CalendarView;