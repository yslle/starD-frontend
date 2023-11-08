import React, { useState, useEffect, useRef } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";
import App from "../../App.js";
import "../../css/study_css/MyParticipateStudy.css";
import Header from "../../components/repeat_etc/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import Paging from "../../components/repeat_etc/Paging";
import StudyDashBoard from "../../css/study_css/StudyDashBoard.css";

const HomeDashBoard = () => {

    const accessToken = localStorage.getItem('accessToken');
    const [ApplyMemberList, setApplyMemberList] = useState([]); //참여멤버
    const [ApplyStudyList, setApplyStudyList] = useState([]);
    const [studies, setStudies] = useState([]);

    const [scrapStates, setScrapStates] = useState([]);
    const [likeStates, setLikeStates] = useState([]);

    // 각 스터디 스크랩, 공감 상태 저장
    // (위에 scrapStates, likeStates 사용하면 의존성 배열 때문에 useEffect 무한 반복,,)
    const [scrapTwoStates, setScrapTwoStates] = useState([]);
    const [likeTwoStates, setLikeTwoStates] = useState([]);

    const location = useLocation();
    const studyState = location.state;
    const [studiesChanged, setStudiesChanged] = useState(false);

    //페이징관련 코드
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const navigate = useNavigate();

    // //TODO 모집완료 시 신청한 스터디멤버의 이름이 모인 배열
    // useEffect(() => {
    //     if (location.state && location.state.acceptedMembers != null) {
    //         const ll = location.state.acceptedMembers;
    //         console.log(ll);
    //     }
    // }, []);

    function calculateDateDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDifference = end - start;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        return daysDifference;
    }

    const toggleScrap = (index) => {
        setStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            const studyId = newStudies[index].study.id;
            if (newStudies[index].scrap) { // true -> 활성화되어 있는 상태 -> 취소해야 함
                axios.delete(`http://localhost:8080/scrap/study/${studyId}`, {
                    params: { id: studyId },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log("스크랩 취소 성공 " + response.data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        console.log("스크랩 취소 실패");
                    });
            } else {
                axios.post(`http://localhost:8080/scrap/study/${studyId}`, null, {
                    params: { id: studyId },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log("스크랩 성공");
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        console.log("스크랩 실패");
                    });
            }
            newStudies[index] = {...newStudies[index], scrap: !newStudies[index].scrap};
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const toggleLike = (index) => {
        setStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            const studyId = newStudies[index].study.id;
            if (newStudies[index].like) { // true -> 활성화되어 있는 상태 -> 취소해야 함
                axios.delete(`http://localhost:8080/star/study/${studyId}`, {
                    params: { id: studyId },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log("공감 취소 성공 " + response.data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        console.log("공감 취소 실패");
                    });
            } else {
                axios.post(`http://localhost:8080/star/study/${studyId}`, null, {
                    params: { id: studyId },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        console.log("공감 성공");
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        console.log("공감 실패");
                    });
            }
            newStudies[index] = {...newStudies[index], like: !newStudies[index].like};
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    useEffect(() => {
        axios.get("http://localhost:8080/mypage/study/star-scrap", { // 공감
            params: {
                page: page,
                status: "participate",
                type: "star",
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setLikeStates(response.data);
            })
            .catch(error => {
                console.log("공감 불러오기 실패", error);
            });

        axios.get("http://localhost:8080/mypage/study/star-scrap", { // 스크랩
            params: {
                page: page,
                status: "participate",
                type: "scrap",
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setScrapStates(response.data);
            })
            .catch(error => {
                console.log("스크랩 불러오기 실패", error);
            });
    }, []);

    const handlePageChange = ({page, itemsPerPage, totalItemsCount}) => {
        setPage(page);

		// 백엔드에 데이터를 요청합니다.
		const result = axios.get("http://localhost:8080/user/mypage/studying", {
			params: {
				page: page,
			}, withCredentials: true,
			headers: {
				'Authorization': `Bearer ${accessToken}`
			}
		});

        // 데이터를 받아온 후 스터디 리스트를 업데이트합니다.
        setStudies(result.data.content);

        // 페이지 정보를 업데이트합니다.
        setItemsPerPage(result.data.pageable.pageSize);
        setCount(result.data.totalElements);

        const res_like = axios.get("http://localhost:8080/mypage/study/star-scrap", { // 공감
            params: {
                page: page,
                status: "participate",
                type: "star",
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const res_scrap = axios.get("http://localhost:8080/mypage/study/star-scrap", { // 스크랩
            params: {
                page: page,
                status: "participate",
                type: "scrap",
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        setLikeTwoStates(res_like)
        setScrapTwoStates(res_scrap);

        const studyList = result.data.content;

        const updateStudies = studyList.map((study, index) => {
            study.like = likeTwoStates[index];
            study.scrap = scrapTwoStates[index];
            return study;
        });

        setStudies(updateStudies);

        setItemsPerPage(itemsPerPage); //한페이지 당 아이템 개수
        setCount(totalItemsCount); //전체 아이템 개수
    };

    //TODO 모집완료 시 참여내역 불러오기

    useEffect(() => {
        // TODO 서버에서 참여스터디 가져오기
        axios.get("http://localhost:8080/user/mypage/studying", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("모집완료된 스터디 전송 성공 : ", res.data);

				const studyList = res.data.content;

                const updateStudies = res.data.content.map((study, index) => {
                    study.like = likeStates[index];
                    study.scrap = scrapStates[index];

                    return study;
                });

                setStudies(updateStudies);

                // 페이지 정보를 업데이트합니다.
                setItemsPerPage(res.data.pageable.pageSize);
                setCount(res.data.totalElements);

                // setApplyStudyList(res.data);
                //setApplyMemberList();

            })
            .catch((error) => {
                console.error("모집완료된 스터디 가져오기 실패:", error);
            });

    }, [accessToken, likeStates, scrapStates]);

    const goNextTeamBlog=(item)=>{
        console.log("팀블로그에 넘겨주는 item:", item);
        navigate(`/${item.study.id}/teamblog`, {
            state:{
                MyParticipate: item
            }
        });
    }

    const mypartistudylist = () => {
        return (
            <div className={"HomeDashBoard"}>
            <div className="study_list">
                {studies.map((d, index) => (
                    <div className="dashboardlist" key={d.study.id} onClick={()=>goNextTeamBlog(d)}>
                        <div className="dashboard_header">
                            <div className="dashboard_sub_header">

                                <div className="list_title">{d.study.title}</div>
                                <div className="dashboard_day">
                                    {calculateDateDifference(d.study.activityStart, d.study.activityDeadline)}일간의 우주여행
                                </div>
                                {d.study.recruitStatus === "RECRUITING" ? (
                                    <div className="list_status">모집중</div>
                                ) : (<div className="list_status">진행중</div>)}
                            </div>
                            <div className="list_btn">
                                <div className="list_like">
                                    <LikeButton like={studies[index].like}
                                                onClick={() => toggleLike(index)}/>
                                </div>
                                <div className="list_scrap">
                                    {/* 스크랩 버튼을 클릭하면 해당 스터디 리스트 항목의 스크랩 상태를 토글 */}
                                    <ScrapButton scrap={studies[index].scrap}
                                                 onClick={() => toggleScrap(index)}/>
                                </div>
                            </div>
                        </div>

                        <div className={"contnet"} >
                            <div className="list_deadline">
                                마감일 | {d.study.recruitmentDeadline} / 팀장: {d.study.recruiter.nickname}
                            </div>
                            <div className={"dashboardsubdetail"}>
                            <div className="list_tag">{d.study.field}</div>
                            <div className="list_onoff">{d.study.onOff}</div>
                            <div className="stroke"></div>
                            <div className="list_founder"></div>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
            </div>
        );
    };
    return (
        <div>
            <div className="main_dash_container">
                     <div className={"View_All"}>
                         <div>
                         <p id={"view-subtitle"}>참여중인 스터디</p>
                         </div>
                         <div>
                         <p>전체보기</p></div>
                      </div>
                <hr/>
                    <div className="dashboard_container">
                        {mypartistudylist()}
                    </div>
            </div>
        </div>
    );
};
export default HomeDashBoard;
