import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import "../../css/study_css/ApplyList.css";
import Header from "../../components/repeat_etc/Header";
import Motive from "../../components/study/Motive";
import axios from "axios";

const StudyApplyList = () => {
    const [applyList, setApplyList] = useState([]);
    const [MotiveToggle, setMotiveToggle] = useState(false);
    const [openMotivationIndex, setOpenMotivationIndex] = useState(-1); // 각 신청자에 대한 상태를 추적하는 상태 추가
    const accessToken = localStorage.getItem('accessToken');
    const [acceptedMembers, setAcceptedMembers] = useState([]);
    // const [count, setCount] = useState(parseInt(localStorage.getItem("count")) || 0); //스터디 모집 정원
    const [count, setCount] = useState(0); //스터디 모집 정원
    const capacity = applyList.length > 0 ? applyList[0].study.capacity : 0; //모집인원
    const [clickedApplyStates, setClickedApplyStates] = useState(Array(applyList.length).fill(false)); //수락버튼 상태
    const [clickedRejectStates, setClickedRejectStates] = useState(Array(applyList.length).fill(false));//거절버튼 상태
    console.log(capacity);

    let {id} = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Save 'count' to local storage whenever it changes
    //     localStorage.setItem("count", count.toString());
    // }, [count]);

    useEffect(() => {

        // TODO 서버에서 지원동기 가져오기
        axios.get(`http://localhost:8080/api/v2/studies/${id}/select`, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                // console.log("신청자 리스트 전송 성공 : ", res.data.data);
                setApplyList(res.data.data);
                setCount(res.data.data.length);

            })
            .catch((error) => {
                console.error("신청자 데이터 가져오기 실패:", error);
            });

    }, []);

    // const SeeMotivation = () => {
    //     setMotiveToggle(true);
    // }
    //
    // const onClose = () => {
    //     setMotiveToggle(false);
    // }

    const toggleMotivation = (index) => {
        if (openMotivationIndex === index) {
            setOpenMotivationIndex(-1); // 이미 열린 모티베이션 모달이라면 닫습니다.
        } else {
            setOpenMotivationIndex(index); // 선택한 신청자의 모티베이션 모달을 엽니다.
        }
    };

    const handleaccept = (memberId, index) => {
        window.confirm(memberId + "을(를) 수락하시겠습니까?");

        //TODO db에서 받아오기 setApplyList로 상태 업데이트
        axios.put(`http://localhost:8080/api/v2/studies/${id}/select`, {}, {
            params: {
                applicantId: memberId,
                isSelect: true
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("수락 전송 성공 : ", res.data);

                if (res.data !== "SUCCESS") {
                    window.confirm(memberId + "을(를) 수락 실패했습니다.");
                    console.log("수락 실패");
                } else {
                    window.confirm(memberId + "을(를) 수락했습니다.");

                    setApplyList((prevApplyList) => {
                        const updatedList = prevApplyList.map((item) => {
                            if (item.member.id === memberId) {
                                // Update the participationState of the accepted member
                                return {...item, participationState: true};
                            }
                            return item;
                        });
                        return updatedList;
                    });

                    //수락버튼 눌렀을때
                    setClickedApplyStates((prevStates) => {
                        const updatedStates = [...prevStates];
                        updatedStates[index] = true;
                        return updatedStates;
                    });
                    //수락버튼 눌렀을 때 거절버튼은 false 상태가 되어야 함
                    setClickedRejectStates((prevStates) => {
                        const updatedStates = [...prevStates];
                        updatedStates[index] = false;
                        return updatedStates;
                    });

                    setAcceptedMembers([...acceptedMembers, memberId]);
                    // if (count < capacity) {
                    //     setCount(count + 1);
                    // }
                }
                // window.location.reload();


            })
            .catch((error) => {
                console.error("수락 실패:", error);
            });

    }

    useEffect(() => {
        console.log("수락한 멤버", acceptedMembers);
        // localStorage.setItem("acceptedMembers", acceptedMembers);
    }, [acceptedMembers]);

    const handlereturn = (memberId, index) => {
        window.confirm(memberId + "을(를) 거절하시겠습니까?");
        //TODO db에서 받아오기 setApplyList로 상태 업데이트
        axios.put(`http://localhost:8080/api/v2/studies/${id}/select`, {}, {
            params: {
                applicantId: memberId,
                isSelect: true
            },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log("거절 전송 성공 : ", res.data);

                if (res.data !== "SUCCESS") {
                    window.confirm(memberId + "을(를) 거절 실패했습니다.");
                    console.log("거절 실패");
                } else {
                    window.confirm(memberId + "을(를) 거절했습니다.");
                    setApplyList((prevApplyList) => {
                        const updatedList = prevApplyList.map((item) => {
                            if (item.member.id === memberId) {
                                // 거절한 멤버 업데이트
                                return {...item, participationState: false};
                            }
                            return item;
                        });
                        return updatedList;
                    });
                    //거절버튼 눌렀을 때
                    setClickedRejectStates((prevStates) => {
                        const updatedStates = [...prevStates];
                        updatedStates[index] = true;
                        return updatedStates;
                    });
                    //거절버튼 눌렀을 때 수락버튼은 false상태가 되어야함
                    setClickedApplyStates((prevStates) => {
                        const updatedStates = [...prevStates];
                        updatedStates[index] = false;
                        return updatedStates;
                    });
                    setAcceptedMembers(acceptedMembers.filter((id) => id !== memberId));

                    // if (count > 0) {
                    //     setCount(count - 1);
                    // }

                }
                // setCount(count-1);
                // window.location.reload();


            })
            .catch((error) => {
                console.error("거절 실패:", error);
            });

    }
    //TODO 모집완료 버튼 누르면 이 함수 실행
    //myparticipatestudy 으로 navigate할 때 넘겨주는 state값은 참여 멤버들의 이름배열임
    const goNextTeamBlog = (count) => {

        if (count > capacity) {
            alert("모집인원을 초과하였습니다.");
            return;
        } else {
            axios.post(`http://localhost:8080/api/v2/studies/${id}/open`,{}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    console.log("모집 완료 성공 : ", res.data);

                    if (res.data !== "SUCCESS") {
                        console.log("모집 완료 실패");
                    } else {
                        alert("모집 완료. 참여내역으로 이동합니다.");
                        console.log("ㄴㅇㄹㄴㅇ:", acceptedMembers);
                        navigate(`/myparticipatestudy`, {
                            state: {
                                "acceptedMembers":acceptedMembers,
                                "studyId":id,
                             }
                        })
                    }
                })
                .catch((error) => {
                    console.error("데이터 가져오기 실패:", error);
                });


        }

    }
    return (
        <div className={"ListWrap"}>
            <Header showSideCenter={true}/>
            <div className={"applylist"}>
                <div className={"ListContent"}>
                    <table className="study_apply_list">
                        <thead>
                        <tr>
                            <th>신청자 이름</th>
                            <th>지원동기 및 각오</th>
                            <th>상태({count}/{capacity})</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applyList.map((item, index) => (
                            <tr key={index}>
                                <td id={"apply_name"}>{item.member.nickname}</td>
                                <td>
                                    <button className={"look_motive"} onClick={() => toggleMotivation(index)}>보기
                                    </button>
                                    {openMotivationIndex === index && (
                                        <Motive motive={item.applyReason} onClose={() => setOpenMotivationIndex(-1)}/>
                                    )}
                                </td>
                                <td>
                                    <span><button className={`acceptbtn ${item.participationState === true ? 'clicked' : ''}`}
                                                  onClick={() => handleaccept(item.member.id, index)}>수락</button></span>
                                    <span><button className={`rejectbtn ${item.participationState === false ? 'clicked' : ''}`}
                                                  onClick={() => handlereturn(item.member.id, index)}>거절</button></span>
                                </td>
                            </tr>
                        ))}

                        {/*))}*/}
                        </tbody>
                    </table>
                </div>
                <div className={"isMember_wrap"}>
                    <p>스터디 멤버</p>
                    <div className={"isMember"}>
                        <table className="study_apply_list">
                            <thead>
                            <tr>
                                <th>신청자 이름</th>
                                <th>지원동기 및 각오</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*신청리스트에서 수락한 사람만 뽑아서 넣기*/}
                            {applyList.map((item, index) => (
                                item.participationState && (
                                    <tr key={index}>
                                        <td id={"apply_name"}>{item.member.nickname}</td>
                                        <td>
                                            <button className={"look_motive"}
                                                    onClick={() => toggleMotivation(index)}>보기
                                            </button>
                                            {openMotivationIndex === index && (
                                                <Motive motive={item.applyReason}
                                                        onClose={() => setOpenMotivationIndex(-1)}/>
                                            )}
                                        </td>
                                        <td>
                                            <span><button
                                                className={`rejectbtn ${clickedRejectStates[index] ? 'clicked' : ''}`}
                                                onClick={() => handlereturn(item.member.id, index)}>수락 취소</button></span>
                                        </td>
                                    </tr>
                                )
                            ))}

                            {/*))}*/}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"apply"}>
                    <button id={"apply-btn"} onClick={() => goNextTeamBlog(count)}>모집완료</button>
                </div>
            </div>
        </div>
    )
}
export default StudyApplyList;