import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Backarrow from "../../components/repeat_etc/Backarrow";
import StudyInsert from "../../components/study/StudyInsert";
import Header from "../../components/repeat_etc/Header";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import LikeButton from "../../components/repeat_etc/LikeButton";

import "../../css/study_css/MyOpenStudy.css";
import "../../css/study_css/StudyDetail.css";
import SearchBar from "../../SearchBar";
import axios from "axios";
import StudyListItem from "../../components/study/StudyListItem";
import Paging from "../../components/repeat_etc/Paging";

const Study = () => {
    const navigate = useNavigate();
    const [studies, setStudies] = useState([]);
    const [scrapStates, setScrapStates] = useState([]);
    const [likeStates, setLikeStates] = useState([]);


    // 각 스터디 스크랩, 공감 상태 저장
    // (위에 scrapStates, likeStates 사용하면 의존성 배열 때문에 useEffect 무한 반복,,)
    const [scrapTwoStates, setScrapTwoStates] = useState([]);
    const [likeTwoStates, setLikeTwoStates] = useState([]);

    const [showStudyInsert, setShowStudyInsert] = useState(false);

    // 각 스터디 리스트 항목의 스크랩 상태를 저장하는 배열
//    const [scrapStates, setScrapStates] = useState(false);
//    const [likeStates, setLikeStates] = useState(false);

    const [studiesChanged, setStudiesChanged] = useState(false);
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    // localStorage에 저장된 accessToken 추출
    let accessToken = localStorage.getItem('accessToken');

    // localStorage에 저장된 로그인한 사용자 Id 추출
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');

    useEffect(() => {
        if (studiesChanged) {
            localStorage.setItem("studies", JSON.stringify(studies));
            localStorage.setItem("ScrapStudies", JSON.stringify(scrapStates));
            localStorage.setItem("LikeStates", JSON.stringify(likeStates));
            // Reset studiesChanged to false

            setStudiesChanged(false);
        }

    }, [studiesChanged, studies, scrapStates, likeStates]);

    //TODO 스크랩, 공감 서버 전송
    useEffect(() => {
        if (accessToken && isLoggedInUserId) {
            axios.get("http://localhost:8080/study/stars", { // 공감
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

            axios.get("http://localhost:8080/study/scraps", { // 스크랩
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


    useEffect(() => {
        const storedStudies = JSON.parse(localStorage.getItem("studies"));
        if (storedStudies) {
            setStudies(storedStudies);
        }
    }, []);

    const updateStudies = (updatedStudies) => {
        setStudies(updatedStudies);
    };

    const handleMoveToStudyInsert = (e) => {
        if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowStudyInsert(!showStudyInsert);
        } else {
            alert("로그인 해주세요");
            navigate("/login");
        }

    };

    const handleStudyInsertClose = () => {
        setShowStudyInsert(false);
    };

    const handleSideHeaderButtonClick = () => {
        setShowStudyInsert(!showStudyInsert);
    };

    // 각 스터디 리스트 항목의 스크랩 상태를 토글하는 함수

    const toggleScrap = (index) => {
        if (!(accessToken && isLoggedInUserId)) {
            alert("로그인 해주세요");
            navigate("/login");
        }

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
            newStudies[index] = { ...newStudies[index], scrap: !newStudies[index].scrap };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const toggleLike = (index) => {
        if (!(accessToken && isLoggedInUserId)) {
            alert("로그인 해주세요");
            navigate("/login");
        }

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
            newStudies[index] = { ...newStudies[index], like: !newStudies[index].like };
            setStudiesChanged(true); // Mark studies as changed
            return newStudies;
        });
    };

    const searchItems = [
        "back-end",
        "front-end",
        "cloud",
        "aws",
        "framework"
    ]

    //페이징관련 코드
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const handlePageChange = ({page, itemsPerPage, totalItemsCount}) => {
        setPage(page);

        // 백엔드에 데이터를 요청합니다.
        const result = axios.get("http://localhost:8080/api/v2/studies/all", {
            params: {
                page: page,
            },
        });

        // // 데이터를 받아온 후 스터디 리스트를 업데이트합니다.
        // setStudies(result.data.content);
        //
        // // 페이지 정보를 업데이트합니다.
        // setItemsPerPage(result.data.pageable.pageSize);
        // setCount(result.data.totalElements);

        // 데이터를 받아온 후 스터디 리스트를 업데이트합니다.
        result.then((response) => {
            setStudies(response.data.content);
            // 페이지 정보를 업데이트합니다.
            setItemsPerPage(response.data.pageable.pageSize);
            setCount(response.data.totalElements);
            // 여기서 다음 작업을 수행할 수 있습니다.

            if (accessToken && isLoggedInUserId) {
                const res_like = axios.get("http://localhost:8080/study/stars", {
                    params: {
                        page: page,
                    },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const res_scrap = axios.get("http://localhost:8080/study/scraps", {
                    params: {
                        page: page,
                    },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                setLikeTwoStates(res_like.data);
                setScrapTwoStates(res_scrap.data);

                const studyList = response.data.content;

                const updateStudies = studyList.map((study, index) => {
                    study.like = likeStates[index];
                    study.scrap = scrapStates[index];

                    return study;
                });

                setStudies(updateStudies);
            }
        }).catch((error) => {
            console.error("데이터 가져오기 실패:", error);
        });

        // setItemsPerPage(itemsPerPage); //한페이지 당 아이템 개수
        // setCount(totalItemsCount); //전체 아이템 개수
    };


    useEffect(() => {
        // TODO: 전체 리스트 값 가져오기
        // 여기서 백엔드에게 데이터 요청
        axios.get("http://localhost:8080/api/v2/studies/all")
            .then((res) => {
                // console.log("전체 리스트 값 가져오기 전송 성공 : ", res.data.content);
                const studyList = res.data.content;

                const updateStudies = res.data.content.map((study, index) => {
                    study.like = likeStates[index];
                    study.scrap = scrapStates[index];
                    return study;
                });

                setStudies(updateStudies);
                // 서버에서 받아온 페이지 정보를 setPageInfo를 통해 업데이트합니다.
                handlePageChange({
                    itemsPerPage: res.data.pageable.pageSize, // 페이지 당 아이템 수
                    totalItemsCount: res.data.totalElements, // 전체 아이템 수
                });
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, [likeStates, scrapStates]);


    return (
        <div className={"main_wrap"} id={"study"}>
            <Header showSideCenter={true}/>
            <div className="study_detail_container" style={{width: "70%"}}>
                <h1>STAR TOUR STORY</h1>
                <div className="arrow_left">
                    <Backarrow/>
                    {!showStudyInsert && (
                        <button onClick={handleMoveToStudyInsert} className="openStudy">
                            스터디 개설
                        </button>
                    )}
                </div>

                <div className="study">
                    {showStudyInsert && (
                        <StudyInsert
                            updateStudies={updateStudies}
                            onClose={handleStudyInsertClose}
                            study ={studies}
                        />
                    )}
                    {!showStudyInsert && (
                        <div>
                        <div>  <SearchBar searchItems={searchItems}/>
                        </div>
                        <div className="content_container">

                            <div className="study_list">
                                {studies.map((d, index) => (
                                    <StudyListItem studies={d} toggleLike={toggleLike} toggleScrap={toggleScrap} d={d}
                                                   index={index} key={d.id}/>
                                ))}
                            </div>
                        </div>
                        </div>
                    )}
                    {!showStudyInsert && studies.length === 0 && <h3>스터디 리스트가 비었습니다.</h3>}
                </div>
            </div>
            <div className={"paging"}>
                {!showStudyInsert && (
                    <Paging  page={page} totalItemCount={count} itemsPerPage={itemsPerPage}/>
                )}
            </div>
        </div>
    );
};

export default Study;