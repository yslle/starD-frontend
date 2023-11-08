import React, { useState, useRef, useCallback, useEffect } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";
import { CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";
import EditSchedule from "./EditSchedule.js";
import { useNavigate } from "react-router-dom";

// import { EditSchedule } from "./EditSchedule.js";
const RenderScheduleCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  meetings,
  onUpdate,
  onRemove,
}) => {
  const monthStart = startOfMonth(currentMonth); //오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); //오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); //monthStart가 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); //monthEnd가 속한 주의 마지막일

  const rows = []; //일월화수목금토(한 주) * 4주 or 5주
  let days = []; //일월화수목금토 (한 주)
  let day = startDate;
  let formattedDate = "";
  const [editScheduleData, setEditScheduleData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`editScheduleData => ${JSON.stringify(editScheduleData)}`);
  }, [editScheduleData]);

  const openEditSchedule = (meeting) => {
    setEditScheduleData(meeting);
    console.log(`editScheduleData => ${JSON.stringify(editScheduleData)}`);
  };
  // const handleCheckEdit = ()=>{
  //   setEditScheduleData('');
  // }

 

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );

      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart) //두개의 날짜가 같은 달에 속하는지 확인하는 함수
              ? "disabled"
              : isSameDay(day, selectedDate) //두개의 날짜 같은지 확인하는 함수
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            <CgAddR onClick={() => onDateClick(cloneDay)} />
            {formattedDate}
          </span>
          <div className="meeting_wrap">
          {meetings[day.toDateString()] &&
              Object.keys(meetings[day.toDateString()]).map((study) =>
                meetings[day.toDateString()][study].map((meeting) => {
                  const startDay = new Date(meeting.start_date);
                  const endDay = new Date(meeting.end_date);
                  return (
                    <div
                      key={meeting.id}
                      className="event"
                      // style={{ backgroundColor: meeting.color }}
                      onClick={() => {
                        openEditSchedule({ meeting });
                      }}
                    >
                      {/* handleEditpage({item:meeting})
                       */}
                       <div id="meeting_detail">
                        <p
                          id="line"
                          style={{ backgroundColor: meeting.color }}
                        ></p>
                        <p>
                          {meeting.study} :
                          {meeting.title}
                        </p>
                      </div>
                    </div>
                  );
                })
              )} 
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="Schedulerow" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return (
    <div className="SchedulerContainer">
      {rows}
      {editScheduleData && (
        <EditSchedule
          editScheduleData={editScheduleData}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onClose={() => {
            setEditScheduleData(null);
          }}
        />
      )}
    </div>
  );
};

export default RenderScheduleCells;
