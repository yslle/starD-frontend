//달력 컴포넌트
import React, {useState, useEffect, useCallback} from "react";
import { format, subMonths, addMonths } from "date-fns";
import RenderHeader from "../calender/RenderHeader";
import RenderDays from "../calender/RenderDays";
import ScheduleCalender_CSS from "../../css/schedule_css/ScheduleCalender.css";
import TeamRenderScheduleCells from "./TeamRenderScheduleCells";

const TeamScheduleCalender = ({studyId,studies, studyTitles,onDateClick ,meetings, schedules,onUpdate,onRemove}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    console.log("studies:", studies);
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleToggle= useCallback((day)=>{
        setSelectedDate(new Date(day));
        console.log("클릭한 날짜");
        console.log(new Date(day));
        onDateClick(new Date(day));
    },[selectedDate]);

    return (
        <div className="TeamSchedulecalendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays/>
            <TeamRenderScheduleCells
                studies={studies}
                studyTitles={studyTitles}
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={handleToggle}
                meetings={meetings}
                schedules={schedules}
                onUpdate={onUpdate}
                onRemove ={onRemove}
            />
        </div>
    );
};
export default TeamScheduleCalender;
