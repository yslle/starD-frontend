import React, {useState, useRef, useCallback, useEffect} from "react";
import ToDoInserts from "../../css/todo_css/ToDoInsert.css";
import axios from "axios";
import {useLocation} from "react-router-dom";

//투두 리스트 추가 함수
//추가할 부분: 서버에서 참여 중인 스터디 내역, 참여 멤버 가지고 오기
//투두리스트 데이터 구조 변경 -> 아이디,스터디 ,할 일,날짜, 담당자

const TeamToDoInsert = ({onInsert, dueDate}) => {
    // const accessToken = localStorage.getItem('accessToken');
    // const [scrapStates, setScrapStates] = useState([]); //내가 지원한 스터디 스크랩 상태값
    // const [likeStates, setLikeStates] = useState([]); //내가 지원한 스터디 공감 상태값

    const [studies, setStudy] = useState([]);//스터디
    const [ParticipateState, setParticipatedState] = useState({}); //참여멤버
    const [studyTitles, setStudyTitles] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const ParticipatedStudy = localStorage.getItem('MyParticipatedStudy');  //참여중인 스터디
        const parsedParticipatedStudy = JSON.parse(ParticipatedStudy);
        const StudyIdANDMember = localStorage.getItem("ParticipateState");
        const parsedStudyIdAndMember = JSON.parse(StudyIdANDMember);
        const studiesTitle = parsedParticipatedStudy.map(studyObj => studyObj.study.title);
        setStudyTitles(studiesTitle);
        console.log("타이틀", studyTitles);
        // const member = localStorage.getItem("acceptedMembers"); //모집 후 최종 멤버들
        // const StudyId = localStorage.getItem("ParticipatedStudyId");
        setStudy(parsedParticipatedStudy);
        console.log("참여하는 스터디", parsedParticipatedStudy);
        console.log("스터디 타이틀", studiesTitle);

        // console.log("참여멤버", member);
        console.log("스터디별 참여 멤버들", parsedStudyIdAndMember);
    }, []);

    // useEffect(() => {
    //     // TODO 서버에서 참여스터디와 참여멤버 가져오기
    //     axios.get("http://localhost:8080/user/mypage/studying", {
    //         withCredentials: true,
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log("모집완료된 스터디, 참여멤버 전송 성공 : ", res.data);
    //
    //             const studyList = res.data.content;
    //
    //             const updateStudies = res.data.content.map((study, index) => {
    //                 study.like = likeStates[index];
    //                 study.scrap = scrapStates[index];
    //
    //                 return study;
    //             });
    //
    //             setStudies(updateStudies);
    //
    //             // localStorage.setItem("MyParticipatedStudy", JSON.stringify(res.data.content));
    //             // 페이지 정보를 업데이트합니다.
    //             // setApplyStudyList(res.data);
    //             //setApplyMemberList();
    //             console.error("모집완료된 스터디, 참여멤버  가져오기:",res.data.content);
    //         })
    //         .catch((error) => {
    //             console.error("모집완료된 스터디, 참여멤버  가져오기 실패:", error);
    //         });
    //
    // }, [accessToken, likeStates, scrapStates]);

    //할 일 state
    const [TaskValue, setTaskValue] = useState('');

    //어떤 스터디의 할 일인지 상태
    const [InsertToDoTitle, setInsertToDoTitle] = useState("")

    //투두 객체 배열 상태
    const [InsertToDo, setInsertToDo] = useState({
            title: InsertToDoTitle,
            task: TaskValue,
            dueDate: dueDate,
        }
    )

    const onChange = useCallback(e => {
        setTaskValue(e.target.value);
    }, [])

    //할 일 추가 버튼 함수
    const onSubmit = useCallback(
        e => {
            if (TaskValue !== '') {
                onInsert(InsertToDoTitle, TaskValue);
            } else {
                alert("할 일을 입력해 주세요.");
                return;
            }
            setTaskValue(''); //value 초기화
            //기본이벤트(새로고침) 방지
            e.preventDefault();
        }
        , [TaskValue])
    const selectStudyTitle = (e) => {
        setInsertToDoTitle(e.target.value)
        console.log(e.target.value);
    }
    return (
        <form className="TodoInsert">
            <select id="todo-select" onChange={selectStudyTitle} value={InsertToDoTitle}>
                <option value="전체">전체</option>
                {studyTitles.map((item, index) => (
                    <option key={index} value={item}>{item}</option>

                ))}
            </select>
            <input id={"insert-input"} onChange={onChange}
                   value={TaskValue}
                   placeholder="할 일을 입력하세요"/>
            <button type="submit" onClick={onSubmit}>입력</button>
        </form>
    );
};
export default TeamToDoInsert;