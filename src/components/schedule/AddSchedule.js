import React, { useState, useRef, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleAdd from "../../css/schedule_css/ScheduleAdd.css";
import { CirclePicker } from "react-color";

const AddSchedule = ({ selectedDate, onInsert, onClose }) => {
  const localDate = new Date(selectedDate);
  const localDateString = localDate.toLocaleDateString();
  const [startDate, setStartDate] = useState(new Date(selectedDate));
  const [endDate, setEndDate] = useState(new Date(selectedDate));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [study, setStudy] = useState("My");
  const [color, setColor] = useState("");

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const onChangeStudy = useCallback((e) => {
    setStudy(e.target.value);
    console.log(e.target.value);
  }, []);
  const onChangeColor = useCallback((color) => {
    setColor(color.hex);
  }, []);
  const onSubmit = useCallback(
    //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
    (e) => {
      if (title != "") {
        console.log("addschedule:", endDate.toDateString());
        onInsert(startDate, endDate, title, content, study, color);
      } else {
        alert("모두 입력해주세요.");
        // return;
      }
      setTitle("");
      setEndDate("");
      setContent("");
      setStudy(""); //value 초기화
      //기본이벤트(새로고침) 방지
      e.preventDefault();
    },
    [content, color]
  );

  return (
    // <div>
    // {showForm &&(
    <div className="background">
      <form className="Scheduleedit_insert">
        <h2>{localDateString}</h2>
        <div className="selectstudy">
          <p>스터디 선택:</p>
          <select defaultValue={study} onChange={onChangeStudy}>
            <option value="My">나의 일정</option>
            <option value="study1">스터디 1</option>
            <option value="study2">스터디 2</option>

            {/* <option value="study3">스터디 3</option> */}
          </select>
        </div>
        <div className="selectDay">
          <div className="selectstartDay">
            <p>시작 날짜:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              // readOnly
              placeholder="시작 날짜 선택"
            />
          </div>
          <div className="selectendDay">
            <p>끝나는 날짜:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholder="끝나는 날짜 선택"
              minDate={startDate}
            />
          </div>
        </div>
        <div className="selecttitle">
          <p>일정 이름:</p>
          <input
            onChange={onChangeTitle}
            value={title}
            placeholder="일정 이름을 입력하세요"
          />
        </div>
        <div className="selectcontent">
          <p>일정 내용:</p>
          <textarea
            onChange={onChangeContent}
            value={content}
            placeholder="일정 내용을 입력하세요"
          />
        </div>
        <div className="selectcolor">
          <p>표시 색상:</p>
          <CirclePicker color={color} onChange={onChangeColor} />
        </div>
        <ul className="meeting_btn">
          <li>
        <button id="add" type="submit" onClick={onSubmit}>
          생성
        </button>
        </li>
        <li>
        <button id="cancel" type="button" onClick={onClose}>
          취소
        </button>
        </li>
        </ul>
      </form>
    </div>
    // )}
    // </div>
  );
};
export default AddSchedule;
