import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";
import axios from "axios";

const ToDoEdit = ({selectedTodo, onUpdate, participatedstudies,onClose}) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("selectedTodo", selectedTodo);
    const [ParticipateState, setParticipatedState] = useState({}); //참여멤버
    const [studyTitles, setStudyTitles] = useState([]);
    const [studyMems, setStudyMems] = useState(""); //참여 멤버
    const inputDate = new Date(selectedTodo.toDo.date);
    const [UpdatedToDo, setUpdatedToDo] = useState(selectedTodo);
// 로컬 시간대 고려
    const offset = inputDate.getTimezoneOffset();
    inputDate.setMinutes(inputDate.getMinutes() - offset);

    const formattedDate = inputDate;

    //어떤 스터디의 할 일인지 상태
    const [InsertToDoStudyTitle, setInsertToDoStudyTitle] = useState(selectedTodo.toDo.study.title)
    const [InsertToDoStudyId, setInsertToDoStudyId] = useState(selectedTodo.toDo.study.id);

    useEffect(() => {
        console.log("participatedstudies", participatedstudies); //참여하고있는 스터디
        const EditstudiesTitle = participatedstudies.map(studyObj => studyObj.study.title);
        setStudyTitles(EditstudiesTitle);
        // setStudy(studies);
        const ParticipatedStudiesMem = participatedstudies.map(item => item.member.id);
        setStudyMems(ParticipatedStudiesMem[0]);

    }, []);

    const [task, setTask] = useState('');
    const onChange = useCallback((e) => {
        console.log("task", e.target.value);
        setTask(e.target.value);
        setUpdatedToDo((prevState) => {
            return {
                ...prevState,
                toDo: {
                    ...prevState.toDo,
                    task: e.target.value,
                },
            };
        });
        console.log("setUpdatedToDo", UpdatedToDo);
    }, [task]);

    const selectStudyTitle = useCallback((e) => {
        setInsertToDoStudyTitle(e.target.value)
        const selectedStudyId = participatedstudies.find((studyObj) => studyObj.study.title === e.target.value)?.study.id;
        setInsertToDoStudyId(selectedStudyId);
        console.log(e.target.value);
        setUpdatedToDo((prevState) => {
            return {
                ...prevState,
                study: {
                    ...prevState.toDo.study,
                    title: e.target.value,
                },
            };
        });
    }, [InsertToDoStudyId]);

    const onSubmit = useCallback(async (e) => {
        alert("수정되었습니다.");
        console.log("setUpdatedToDo?:", UpdatedToDo);
        onUpdate(UpdatedToDo);
    }, [onChange,selectStudyTitle,studyMems]);

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
                <div className={"todo-edit-btn"}>
                <button type="submit">수정하기</button>
                <button id="cancel" type="button" onClick={onClose}>
                    취소
                </button>
                </div>
            </form>

        </div>
    )
}
export default ToDoEdit;