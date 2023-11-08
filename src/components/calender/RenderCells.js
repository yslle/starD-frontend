import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth); //오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); //오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); //monthStart가 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); //monthEnd가 속한 주의 마지막일

  const rows = []; //일월화수목금토(한 주) * 4주 or 5주
  let days = []; //일월화수목금토 (한 주)
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()); // Clone the date without time
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
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>
};

export default RenderCells;
