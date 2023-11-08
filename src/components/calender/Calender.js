//달력 컴포넌트
import React, {useEffect, useState} from 'react';
import {format, subMonths, addMonths} from "date-fns"
import RenderHeader from "./RenderHeader";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";
import Calender_css from "../../css/calender_css/Calender.css";
import ToDoList from "../../pages/mypage/ToDoList";

export const Calender = ({todo, onDateClick,prevMonth,nextMonth,currentMonth}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays/>
            <RenderCells
                todo={todo}
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}/>
        </div>
    );
};
export default Calender;