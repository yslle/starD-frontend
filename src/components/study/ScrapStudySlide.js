import Slide from "./Slide.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/study_css/MyParticipateStudy.css";
import "../../css/mypage_css/Mypage_Scrap.css";
import StudyListItem from "./StudyListItem";
import React from "react";

const ScrapStudySlide = ({studies, toggleLike, toggleScrap, d, index, slide}) => {
    // const {title, field, author, number, onoff,sido, gugun, deadline, startDate, endDate, description, tag, created_date, id} = study;
  return (
    <li
      // className="list_detail"
      // id={id}
      style={{
        transform: `translateX(${slide}px)`,
        transition: "0.5s ease",
      }}
    >
        <StudyListItem studies={studies} toggleLike={toggleLike} toggleScrap={toggleScrap} d={d} index={index}/>
    </li>
  );
};
export default ScrapStudySlide;
