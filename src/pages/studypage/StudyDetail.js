import React, {useState, useEffect} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import "../../css/study_css/StudyDetail.css";
import "../../css/comment_css/Comment.css";

import StudyInfo from "../../components/study/StudyInfo";
import StudyEdit from "../../components/study/StudyEdit";
import Backarrow from "../../components/repeat_etc/Backarrow";
import Comment from "../../components/comment/Comment";
import {useLocation} from "react-router-dom";
import axios from "axios";
import StudyApplyList  from "../../pages/studypage/StudyApplyList";



const StudyDetail = ({sideheader}) => {

    const location = useLocation();
    let studyId = location.state;     // StudyListItem.js 파일에서 스터디 id 값을 get
    console.log("studyId : ", studyId);

    const [studyItem, setStudyItem] = useState();
    const navigate = useNavigate();

    const {id} = useParams();
    console.log("studyId : ", id);

    const [studies, setStudies] = useState([]);
    const [editing, setEditing] = useState(false);
    const [studyDetail, setStudyDetail] = useState([]);// 스터디 상세 정보를 상태로 관리
    const [isApply, setIsApply] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [applyReason, setApplyReason] = useState([]);
    const [isRecruiter, setIsRecruiter] = useState(false);

    useEffect(() => {

        if (studyId === null) {
            studyId = id;
        }

        // 백엔드 REST API 호출 코드
        axios.get(`http://localhost:8080/api/v2/studies/${studyId}`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            // console.log("전송 성공 : ", res.data);
            setStudyItem(res.data);
            if (res.data.recruiter.id === isLoggedInUserId) {
                console.log("자기 자신의 글",res.data);
                setIsRecruiter(true);
            }
        })
            .catch((error) => {
                alert("로그인 해 주세요.");
                navigate('/login');
                console.error("스터디 세부 데이터 가져오기 실패:", error);
            });

        // 백엔드 REST API 호출 코드
        axios.get(`http://localhost:8080/api/v2/studies/${studyId}/apply-reason`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((res) => {
            // console.log("스터디 지원 여부 데이터 전송 성공 : ", res.data);
            const result = res.data;
            if (result.length !== 0 ) {   // 지원했으면 true
                console.log("지원 O");
                setIsApply(true);
                setApplyReason(res.data.applyReason);
            }
        })
            .catch((error) => {
                console.error("스터디 지원 여부 데이터 가져오기 실패:", error);
            });
    }, [id]); // 빈 종속성 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행


    const handleEditClick = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditing(false);
    }

    const handleStudyUpdate = (updatedStudy) => {
        console.log("수정될 데이터?:",updatedStudy);
        setEditing(false);
        const accessToken = localStorage.getItem('accessToken');

        axios.put(`http://localhost:8080/api/v2/studies/${updatedStudy.id}`,
            {
                title: updatedStudy.title,
                field: updatedStudy.field,  // 분야
                capacity: updatedStudy.number, // 모집 인원
                onOff: updatedStudy.onoff,  // 온/온라인/무관
                city: updatedStudy.sido,    // 시
                district: updatedStudy.gugun,   // 구
                recruitmentDeadline: updatedStudy.deadline,    // 모집 마감
                activityStart: updatedStudy.startDate, // 활동 시작
                activityDeadline: updatedStudy.endDate, // 활동 마감
                content: updatedStudy.description, // 내용
                tags: updatedStudy.tag,    // 태그
                // scrap: studies.scrap,
                // like:studies.like,
            },
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.log("API Response:", res.data);
                console.log("수정 성공");
                // console.log(res.data);
                //성공하면
                // navigate("/myopenstudy", {state: formData});
            }).catch((error) => {
            console.log('수정 실패', error);
        })

        setStudyDetail(updatedStudy);
        console.log("updatedStudies",studyDetail);

        const updatedStudies = studies.map(study =>
            study.id === updatedStudy.id ? updatedStudy : study
        );
        setStudies(updatedStudies);

    }

    const handleStudyDelete = () => {
        const confirmDelete = window.confirm("정말로 스터디를 삭제하시겠습니까?");
        if (confirmDelete) {
            const updatedStudies = studies.filter(study => study.id !== studyDetail[0].id);
            setStudies(updatedStudies);
            localStorage.setItem("studies", JSON.stringify(updatedStudies));
            window.location.href = "/myopenstudy";
        }
    }

    // useEffect(() => {
    //     const filteredStudyDetail = studies.filter(study => study.id == Number(id));
    //     setStudyDetail(filteredStudyDetail); //해당 페이지의 스터디 상세 정보 랜더링에 사용
    // }, [studies, id]);
    //
    // useEffect(() => {
    //     if (studyDetail.length > 0 && studyDetail[0].reason) {
    //         setIsApply(true);
    //     } else {
    //         setIsApply(false);
    //     }
    // }, [studyDetail]);
    console.log("isApply3 : ", isApply);

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="study_detail_container">
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                </div>
                {editing ? (
                    <StudyEdit
                        study={studyItem}
                        onUpdateStudy={handleStudyUpdate}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <div className="study_detail">
                        {studyItem && (
                            <div key={studyItem.id}>
                                <StudyInfo
                                    study={studyItem}
                                    handleEditClick={handleEditClick}
                                    handleStudyDelete={handleStudyDelete}
                                />
                                <div className="study_intro">
                                    <div>스터디 소개</div>
                                    {studyItem && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: studyItem.content.replace(/\n/g, "<br>"),
                                            }}
                                        />
                                    )}
                                </div>
                                {isApply === true && applyReason && (
                                    <div className="study_apply_reason">
                                        <div>나의 지원동기 및 각오</div>
                                        <div>{applyReason}</div>
                                    </div>
                                )}
                                {isApply === false && isRecruiter === false && (
                                    <div className="btn">
                                        <Link
                                            to={`/studyapplyform/${studyItem.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <button className="apply_btn">탑승하기</button>
                                        </Link>
                                    </div>
                                )}
                                {isApply === false && isRecruiter === true && (
                                    <div className="btn">
                                        <Link
                                            to={`/StudyApplyList/${studyItem.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <button className="apply_btn">신청자 조회</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="comment_container">
                <Comment/>
            </div>
        </div>
    );
};

export default StudyDetail;