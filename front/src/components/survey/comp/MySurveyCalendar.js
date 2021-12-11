import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';

const MyCalendar = ({data}) => {
    const [surveyList, setSurveyList] = useState([]);
    const eventList = [];

    useEffect(()=>{
        data&&setSurveyList(data.surveylist);
    },[data]);
    
    surveyList.forEach(function(e) {
         const event = {
            title: e.sur_Title,
            start: e.sur_StartDate,
            end : e.sur_EndDate 
        }
         eventList.push(event);
    })

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, listPlugin]}
                aspectRatio = '2'
                calendarWeekends = 'true'
                max="700px"
                contentHeight = {550}
                locale = 'ko'
                expandRows = "true" 
                events={eventList}
                headerToolbar={{ end: "prev,next", start: "title"}}
                dayHeaderFormat={{ weekday: "short"}}
                dayMaxEventRows={2}
                showNonCurrentDates = {0}                                
            />
        </>
    );
};

export default MyCalendar;