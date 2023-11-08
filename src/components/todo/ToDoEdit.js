import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";
import axios from "axios";

const ToDoEdit = ({selectedTodo, onUpdate, participatedstudies}) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("selectedTodo", selectedTodo);
    const [ParticipateState, setParticipatedState] = useState({}); //참여멤버
    const [studyTitles, setStudyTitles] = useState([]);
    const [studyMems, setStudyMems] = useState(""); //참여 멤버
    const inputDate = new Date(selectedTodo.toDo.date);

// 로컬 시간대 고려
    const offset = inputDate.getTimezoneOffset();
    inputDate.setMinutes(inputDate.getMinutes() - offset);

    const formattedDate = inputDate;


    //어떤 스터디의 할 일인지 상태
    const [InsertToDoStudyTitle, setInsertToDoStudyTitle] = useState(selectedTodo.toDo.study.title)
    const [InsertToDoStudyId, setInsertToDoStudyId]= useState(selectedTodo.toDo.study.id);
    useEffect(() => {
        console.log("participatedstudies", participatedstudies);
        const EditstudiesTitle = participatedstudies.map(studyObj => studyObj.study.title);
        setStudyTitles(EditstudiesTitle);
        // setStudy(studies);
        const ParticipatedStudiesMem = participatedstudies.map(item => item.member.id);
        setStudyMems(ParticipatedStudiesMem[0]);

    }, []);

    const [task, setTask] = useState('');
    const onChange = useCallback((e) => {
        setTask(e.target.value);
    }, []);
    const selectStudyTitle = (e) => {
        setInsertToDoStudyTitle(e.target.value)
        const selectedStudyId = participatedstudies.find((studyObj) => studyObj.study.title === e.target.value)?.study.id;
        setInsertToDoStudyId(selectedStudyId);
        console.log(e.target.value);
    }
    const onSubmit = useCallback(async (e) => {
            alert("수정되었습니다.");
            console.log("selectedTodo.toDo.id", selectedTodo.toDo.id);
            console.log("InsertToDoStudyTitle", InsertToDoStudyTitle);
            console.log("task", task);
            onUpdate(selectedTodo.toDo.id, InsertToDoStudyId, task);

                // const assigneeStr = studyMems;
                // const todoData = {
                //     task: task,
                //     dueDate: formattedDate,
                // };
                //
                // const postDataResponse = await axios.put(`http://localhost:8080/todo/${selectedTodo.toDo.id}`, todoData, {
                //     params: {
                //         studyId: InsertToDoStudyId,
                //         assigneeStr: assigneeStr,
                //     },
                //     withCredentials: true,
                //     headers: {
                //         'Authorization': `Bearer ${accessToken}`
                //     }
                // });
                //
                // console.log("전송 성공:", postDataResponse.data);
                //
                // setTask(''); //value 초기화
                // //기본이벤트(새로고침) 방지
                // e.preventDefault();
            }, [],);

    useEffect(() => {
        if (selectedTodo) {
            setTask(selectedTodo.toDo.task);
        }
    }, [selectedTodo]);

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit_insert">
                <h2>수정하기</h2>
                <select id="todo-select" onChange={selectStudyTitle} value={InsertToDoStudyTitle}>
                    <option value="전체">전체</option>
                    {studyTitles.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <input
                    onChange={onChange}
                    value={task}
                    placeholder="할 일을 입력하세요"/>
                <button type="submit">수정하기</button>
            </form>

        </div>
    )
}
export default ToDoEdit;