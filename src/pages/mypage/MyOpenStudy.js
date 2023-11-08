import React, {useState, useEffect, useRef, useCallback} from "react";
import {Link, useLocation} from "react-router-dom";
import Category from "../../components/repeat_etc/Category.js";
import "../../css/study_css/MyOpenStudy.css";
import Header from "../../components/repeat_etc/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import Paging from "../../components/repeat_etc/Paging";
import Pagination from "../../css/study_css/Pagination.css";
import axios from "axios";

const MyOpenStudy = ({sideheader}) => {
    const [studies, setStudies] = useState([]);
    const [scrapStates, setScrapStates] = useState([]); //내가 지원한 스터디 스크랩 상태값
    const [likeStates, setLikeStates] = useState([]); //내가 지원한 스터디 공감 상태값

    // 각 스터디 스크랩, 공감 상태 저장
    // (위에 scrapStates, likeStates 사용하면 의존성 배열 때문에 useEffect 무한 반복,,)
    const [scrapTwoStates, setScrapTwoStates] = useState([]);
    const [likeTwoStates, setLikeTwoStates] = useState([]);

    const location = useLocation();
    const studyState = location.state;
    const [studiesChanged, setStudiesChanged] = useState(false);

    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    //페이징관련 코드
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    //TODO MyOpenStudy 서버 전달 -> 해결
    // useEffect(() => {
    //     if (studiesChanged) {
    //         const response = axios.post("url", {
    //                 "study": studies,
    //                 "scrap": scrapStates,
    //                 "like": likeStates,
    //             },
    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 }
    //             })
    //             .then((res) => {
    //                 console.log("전송 성공");
    //                 console.log(res.data);
    //                 //성공하면
    //                 // navigate("/myopenstudy", {state: formData});
    //
    //             }).catch((error) => {
    //                 console.log('전송 실패', error);
    //             })
    //         console.log("response : ", response);
    //
    //         localStorage.setItem("studies", JSON.stringify(studies));
    //         localStorage.setItem("ScrapStudies", JSON.stringify(scrapStates));
    //         localStorage.setItem("LikeStates", JSON.stringify(likeStates));
    //         // Reset studiesChanged to false
    //         setStudiesChanged(false);
    //     }
    // }, [studiesChanged, studies, scrapStates, likeStates]);

    useEffect(() => {
        if (accessToken && isLoggedInUserId) {
            axios.get("http://localhost:8080/mypage/study/star-scrap", { // 공감
                params: {
                    page: page,
                    status: "open",
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
                    status: "open",
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
        }
    }, []);

    const handlePageChange = ({page, itemsPerPage, totalItemsCount}) => {
        setPage(page);

        // 백엔드에 데이터를 요청합니다.
        const result = axios.get("http://localhost:8080/user/mypage/open-study", {
            params: {
                page: page,
            }, withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        result.then((response) => {
            setStudies(response.data.content);

            setItemsPerPage(response.data.pageable.pageSize);
            setCount(response.data.totalElements);

            if (accessToken && isLoggedInUserId) {
                const res_like = axios.get("http://localhost:8080/mypage/study/star-scrap", { // 공감
                    params: {
                        page: page,
                        status: "open",
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
                        status: "open",
                        type: "scrap",
                    },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                setLikeTwoStates(res_like)
                setScrapTwoStates(res_scrap);

                const studyList = response.data.content;

                const updateStudies = studyList.map((study, index) => {
                    study.like = likeTwoStates[index];
                    study.scrap = scrapTwoStates[index];
                    return study;
                });

                setStudies(updateStudies);
            }
        }).catch((error) => {
            console.error("데이터 가져오기 실패:", error);
        });



        setItemsPerPage(itemsPerPage); //한페이지 당 아이템 개수
        setCount(totalItemsCount); //전체 아이템 개수
    };

    //TODO MyOpenStudy 데이터 받아오기
    useEffect(() => {
        axios.get("http://localhost:8080/user/mypage/open-study", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("전송 성공 : ", res.data);

                const studyList = res.data.content;

                const updateStudies = res.data.content.map((study, index) => {
                    study.like = likeStates[index];
                    study.scrap = scrapStates[index];

                    return study;
                });

                setStudies(updateStudies);

//                handlePageChange({
//                    itemsPerPage: res.data.pageable.pageSize, // 페이지 당 아이템 수
//                    totalItemsCount: res.data.totalElements, // 전체 아이템 수
//                });

				// 페이지 정보를 업데이트합니다.
				setItemsPerPage(res.data.pageable.pageSize);
				setCount(res.data.totalElements);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, [accessToken, likeStates, scrapStates]);

    const toggleScrap = (index) => {
        setStudies((prevStudies) => {
            const newStudies = [...prevStudies];
            const studyId = newStudies[index].id;
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
            const studyId = newStudies[index].id;
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

    function calculateDateDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDifference = end - start;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        return daysDifference;
    }

    const mypartistudylist = () => {
        return (
            <div className="study_list">
                {studies.map((d, index) => (
                    <div className="list" key={d.id}>

                        <div className="list_header">
                            <div className="list_sub_header">
                                <div className="list_day">
                                    {calculateDateDifference(d.activityStart, d.activityDeadline)}일간의 우주여행
                                </div>
                                {d.recruitStatus === "RECRUITING" ? (
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
                        <Link
                            to={`/studydetail/${d.id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            <div className="list_deadline">
                                마감일 | {d.recruitmentDeadline}
                            </div>
                            <div className="list_title">{d.title}</div>
                            <div className="list_tag">{d.field}</div>
                            <div className="list_onoff">{d.onOff}</div>
                            <div className="stroke"></div>
                            <div className="list_founder">{d.recruiter.nickname}</div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="container">
                <Category/>
                <div className="main_container">
                    <h2>스터디 개설 내역</h2>
                    <div className="content_container">
                        {mypartistudylist()}
                    </div>
                </div>

            </div>
            <div className={"paging"}>
                <Paging page={page} totalItemCount={count} itemsPerPage={itemsPerPage}
                        handlePageChange={handlePageChange}/>
            </div>
        </div>
    );
};
export default MyOpenStudy;
