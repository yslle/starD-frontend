//달력 컴포넌트
import React, { useState,useEffect } from "react";
import { format, subMonths, addMonths } from "date-fns";
import RenderHeader from "../calender/RenderHeader";
import RenderDays from "../calender/RenderDays";
import RenderScheduleCells from "./RenderScheduleCells";
import ScheduleCalender_CSS from "../../css/schedule_css/ScheduleCalender.css";

const ScheduleCalender = ({ onDateClick ,meetings, onUpdate,onRemove}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleToggle=(day)=>{
    setSelectedDate(new Date(day));
    console.log("클릭한 날짜");
    console.log(selectedDate);
    onDateClick(new Date(day)); //부모 컴포넌트로 선택한 날짜 전달하기
  }
 
  return (
    <div className="Schedulecalendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderScheduleCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={handleToggle}
        meetings={meetings}
        onUpdate={onUpdate}
        onRemove ={onRemove}
      />
    </div>
  );
};
export default ScheduleCalender;
