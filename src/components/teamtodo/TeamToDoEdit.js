import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";

const TeamToDoEdit = ({selectedTodo, onUpdate}) => {
    console.log("selectedTodo",selectedTodo);
    const [studies, setStudy] = useState([]);//스터디
    const [ParticipateState, setParticipatedState] = useState({}); //참여멤버
    const [studyTitles, setStudyTitles] = useState([]);
    const location = useLocation();
    //어떤 스터디의 할 일인지 상태
    const [InsertToDoTitle, setInsertToDoTitle] = useState(selectedTodo.todo.title)

    useEffect(() => {
        const EditParticipatedStudy = localStorage.getItem('MyParticipatedStudy');  //참여중인 스터디
        const parsedEditParticipatedStudy = JSON.parse(EditParticipatedStudy);
        const EditStudyIdANDMember = localStorage.getItem("ParticipateState");
        const parsedEditStudyIdAndMember = JSON.parse(EditStudyIdANDMember);
        const EditstudiesTitle = parsedEditParticipatedStudy.map(studyObj => studyObj.study.title);
        setStudyTitles(EditstudiesTitle);
        setStudy(parsedEditParticipatedStudy);
    }, []);

    const [value, setValue] = useState('');
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const selectStudyTitle = (e) => {
        setInsertToDoTitle(e.target.value)
        console.log(e.target.value);
    }
    const onSubmit = useCallback((e) => {
            alert("수정되었습니다.");
            onUpdate(selectedTodo.todo.id, InsertToDoTitle, value);
            setValue(''); //value 초기화
            //기본이벤트(새로고침) 방지
            e.preventDefault();

        },
        [onUpdate, value],
    );


    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.todo.task);
        }
    }, [selectedTodo]);

    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit_insert">
                <h2>수정하기</h2>
                <select id="todo-select" onChange={selectStudyTitle} value={InsertToDoTitle}>
                    <option value="전체">전체</option>
                    {studyTitles.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <input
                    onChange={onChange}
                    value={value}
                    placeholder="할 일을 입력하세요"/>
                <button type="submit">수정하기</button>
            </form>

        </div>
    )
}
export default TeamToDoEdit;