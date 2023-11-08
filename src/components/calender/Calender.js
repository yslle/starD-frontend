//달력 컴포넌트
import React, {useState} from 'react'; 
import {format, subMonths, addMonths} from "date-fns"
import RenderHeader from "./RenderHeader";
import RenderDays from "./RenderDays";
import RenderCells from "./RenderCells";
import Calender_css from "../../css/calender_css/Calender.css";
import ToDoList from "../../pages/mypage/ToDoList";

export const Calender = ({todo, onDateClick}) => {
    const[currentMonth, setCurrentMonth] =useState(new Date());
    const[selectedDate, setSelectedDate] =useState(new Date());

    const prevMonth=()=>{
        setCurrentMonth(subMonths(currentMonth, 1));

    };
    const nextMonth=()=>{
        setCurrentMonth(addMonths(currentMonth, 1));

    };
    const handleDateClick = (day)=>{
        setSelectedDate(new Date(day));
        console.log("클릭한 날짜");
        console.log(selectedDate);
        onDateClick(new Date(day)); //부모 컴포넌트로 선택한 날짜 전달하기
    };
    return (
        <div className= "calendar">
                <RenderHeader 
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    />
            <RenderDays/>
          <RenderCells 
          currentMonth ={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}/>
          </div>
    );
};
export default Calender;