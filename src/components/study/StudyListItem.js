import LikeButton from "../repeat_etc/LikeButton";
import ScrapButton from "../repeat_etc/ScrapButton";
import {Link,useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

import axios from "axios";

function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDifference = end - start;
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
}

function checkRecruitStatus(recruitStatus) {

    if (recruitStatus == "RECRUITING")
        return "모집 중";
    else
        return "모집 완료";
}

const StudyListItem = ({studies, toggleLike, toggleScrap, d, index}) => {

    // console.log("studies : ", studies);
    // console.log("d : ", d);

    const daysDifference = calculateDateDifference(studies.activityStart, studies.activityDeadline);
    const recruitStatus = checkRecruitStatus(studies.recruitStatus);
    const navigate = useNavigate();

    //TODO ListItem 조회
    // const accessToken = localStorage.getItem('accessToken');
    // useEffect(()=>{
    //     console.log(d);
    //    const response = axios.post("url", {
    //        activityDeadline: d.activityDeadline,
    //        activityStart:d.activityStart,
    //        capacity:d.capacity,
    //        city:d.city,
    //        content:d.content,
    //        createdAt:d.createdAt,
    //        district:d.district,
    //        field:d.field,
    //        id:d.id,
    //        onOff:d.onoff,
    //        progressStatus:d.progressStatus,
    //        recruitStatus:d.recruitStatus,
    //    },{
    //         withCredentials: true,
    //             headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    // .then((res) => {
    //         console.log("전송 성공");
    //         console.log(res.data);
    //         //성공하면
    //         // navigate("/myopenstudy", {state: formData});
    //
    //     }).catch((error) => {
    //         console.log('전송 실패', error);
    //     })
    //     console.log("response : ", response);
    //
    //
    // },[d]);

    const GoNextDetailPage = ()=>{
        // console.log(d.id);
        navigate(`/studydetail/${d.id}`, {state: studies.id})
    }

    return (
        <div className="list" key={studies.id}>
            <div className="list_header">
                <div className="list_sub_header">
                    <div className="list_day">
                        {daysDifference}일간의 우주여행
                    </div>
                    <div className="list_status">{recruitStatus}</div>
                </div>
                <div className="list_btn">
                    <div className="list_like">
                        <LikeButton like={studies.like}
                                    onClick={() => toggleLike(index)}/>
                    </div>
                    <div className="list_scrap">
                        {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                        <ScrapButton scrap={studies.scrap}
                                     onClick={() => toggleScrap(index)}/>
                    </div>
                </div>
            </div>
            {/*navigate("/studydetail/{d.id}", {state: formData})*/}
            {/*<Link*/}
            {/*    to={`/studydetail/${studies.id}`}*/}
            {/*    style={{*/}
            {/*        textDecoration: "none",*/}
            {/*        color: "inherit",*/}
            {/*    }}*/}
            {/*>*/}
            <div className="list_deadline">
                마감일 | {studies.recruitmentDeadline}
            </div>
            <div className="list_title" onClick={GoNextDetailPage}>{studies.title}</div>
            <div className="list_tag" onClick={GoNextDetailPage}>{studies.tags}</div>
            <div className="list_onoff" onClick={GoNextDetailPage}>{studies.onOff}</div>
            <div className="stroke" ></div>
            <div className="list_founder" >{studies.recruiter?.nickname}</div>
            {/*</Link>*/}
        </div>
    )
}
export default StudyListItem;