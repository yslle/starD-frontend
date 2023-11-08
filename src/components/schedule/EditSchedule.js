import React, { useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { CirclePicker } from "react-color";
import studyList from "../../pages/studypage/StudyList";

const EditSchedule = ({ editScheduleData, onUpdate, onRemove, onClose }) => {
  const localDate = new Date(editScheduleData.meeting.start_date);
  const localDateString = localDate.toLocaleDateString();

  const [startDate, setStartDate] = useState(
    new Date(editScheduleData.meeting.start_date)
  );

  const [endDate, setEndDate] = useState(
    new Date(editScheduleData.meeting.end_date)
  );

  const [title, setTitle] = useState(editScheduleData.meeting.title);
  const [content, setContent] = useState(editScheduleData.meeting.content);
  const [study, setStudy] = useState(editScheduleData.meeting.study);
  const [color, setColor] = useState(editScheduleData.meeting.color);

  //수정하기 전의 스터디 저장
  const cloneStudy = editScheduleData.meeting.study;

  const handleStartDateChange = useCallback((date) => {
    setStartDate(date);
    console.log(startDate);
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setEndDate(date);
    console.log(endDate);
  }, []);
  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const onChangeStudy = useCallback((e) => {
    setStudy(e.target.value);
  }, []);
  const onChangeColor = useCallback((color) => {
    setColor(color.hex);
  }, []);
  const onSubmit = useCallback(
    //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!

    (e) => {
      if (title != "") {
        // ggg();
        onUpdate(
          editScheduleData.meeting.id,
          new Date(startDate),
          new Date(endDate),
          title,
          content,
          cloneStudy,
          study,
          color
        );
      } else {
        alert("모두 입력해주세요.");
      }
      setTitle("");
      setEndDate("");
      setContent("");
      setStudy(""); //value 초기화
      //기본이벤트(새로고침) 방지
      onClose();
      e.preventDefault();
    },
    [startDate, endDate, title, content, color, study]
  );
  const onDelete = useCallback(
    //나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄겁니다!
    (e) => {
      onRemove(editScheduleData.meeting.id);
      onClose();
    },
    []
  );

  return (
    <div className="background">
      <form className="Scheduleedit_insert">
        <h2>{editScheduleData.meeting.title}</h2>
        <div className="selectstudy">
          <p>스터디 선택:</p>
          <select
            value={study}
            // default={editScheduleData.meeting.study}
            onChange={onChangeStudy}
            // disabled
          >
            <option value="My">나의 일정</option>
            <option value="study1">스터디 1</option>
            <option value="study2">스터디 2</option>
          </select>
        </div>
        <div className="selectDay">
          <div className="selectstartDay">
            <p>시작 날짜:</p>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              // readOnly
              placeholder="시작 날짜 선택"
            />
          </div>
          <div className="selectendDay">
            <p>끝나는 날짜:</p>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={startDate}
              placeholder="끝나는 날짜 선택"
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
           수정
        </button>
        </li>
        <li>
        <button id="del" type="button" onClick={onDelete}>
           삭제
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
  );
};
export default EditSchedule;
