import {format} from "date-fns";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
    <div className="header row">
      <div className="col col-start">
        <span className="text_today">
          <span className="text month">{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div className="col col-end">
      <BsFillArrowLeftCircleFill onClick={prevMonth}/>
        <BsFillArrowRightCircleFill onClick={nextMonth}/>
      </div>
    </div>
  );
};
export default RenderHeader;
