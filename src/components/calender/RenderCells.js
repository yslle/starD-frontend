import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from "date-fns";
import {isSameMonth, isSameDay, addDays, parse, format} from "date-fns";
import todoImage from "../../images/Logo.png";

const RenderCells = ({todo, currentMonth, selectedDate, onDateClick}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";


    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "d");
            const cloneDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()); // Clone the date without time
            const hasTodo = todo && todo[format(cloneDay, "EEE MMM dd yyyy")];
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart) 
                            ? "disabled"
                            : isSameDay(day, selectedDate)
                                ? "selected"
                                : format(currentMonth, "M") !== format(day, "M")
                                    ? "not-valid"
                                    : "valid"
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    {hasTodo ? (
                            <div>
                                <span
                                    className={
                                        format(currentMonth, "M") !== format(day, "M")
                                            ? "text not-valid"
                                            : ""}
                                >{formattedDate}
                                </span>
                              <img src={todoImage} width="20px" height="20px"/>
                            </div>
                        ) :
                        <div><span
                            className={
                                format(currentMonth, "M") !== format(day, "M")
                                    ? "text not-valid"
                                    : ""}>{formattedDate}</span>
                        </div>
                    }
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
