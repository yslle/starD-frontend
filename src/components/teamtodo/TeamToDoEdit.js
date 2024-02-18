import React, {useState, useRef, useCallback, useEffect} from "react";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import {useLocation} from "react-router-dom";
import axios from "axios";

const TeamToDoEdit = ({selectedTodo, onUpdate,Member,Assignees,onClose}) => {
    const accessToken = localStorage.getItem('accessToken');

    console.log("selectedTodo", selectedTodo); //선택된 투두리스트
    console.log("Member", Member);
    console.log("Assignees", Assignees);


    //선택한 투두리스트의 담당자들의 닉네임을 n에 담음
    const n = selectedTodo.assignees.map((item)=> item.member.nickname);
    const [todoassignees,setTodoAssignees] = useState(n);
    const inputDate = new Date(selectedTodo.dueDate);
    const [UpdatedToDo, setUpdatedToDo] = useState({});

    const [memberNicknames, setMemberNicknames] = useState([]);
    const [notAssignedMemberNicknames, setNotAssignedMemberNicknames] = useState([]);


    useEffect(() => {
        // Member 배열에서 닉네임만 추출하여 새로운 배열 생성
        const memberNicknames = Member.map(item => item.member?.nickname).filter(nickname => nickname);

        // todoassignees에 없는 Member Nicknames 필터링
        const notAssignedNicknames = memberNicknames.filter(nickname => !todoassignees.includes(nickname));

        // 상태 업데이트
        setMemberNicknames(memberNicknames);
        setNotAssignedMemberNicknames(notAssignedNicknames);

        console.log("Member Nicknames:", memberNicknames); //스터디에 참여하는 팀원 닉네임 배열
        console.log("Not Assigned Member Nicknames:", notAssignedNicknames); //담당자로 선택받지 못한 자의 닉네임 배열
    }, []);


     // 로컬 시간대 고려
    const offset = inputDate.getTimezoneOffset();
    inputDate.setMinutes(inputDate.getMinutes() - offset);
    const formattedDate = inputDate;
    const [task, setTask] = useState('');


    //담당자 선택 함수
    const handleAddAssignees = (e) => {
        const assignName = e.target.getAttribute('data-assign-name');
        const updatedAssignees = [...todoassignees, assignName];
        setTodoAssignees(updatedAssignees);
        console.log("updatedAssignees", updatedAssignees);
    };


    //담당자 삭제 함수
    const handleRemoveAssignees = (e) => {
        //해당 닉네임을 가진 담당자를 선택에서 해제
        const afterremoveAssignName = todoassignees.filter((item) => item !== e.target.value);
        setTodoAssignees(afterremoveAssignName);
        console.log("삭제한 후 담당자 상태: ", afterremoveAssignName);
    };

    useEffect(() => {
        console.log("todoassignees : ", todoassignees);
    }, [todoassignees]);


    const onChange = useCallback((e) => {
        setTask(e.target.value);
        setUpdatedToDo((prevState) => {
            return {
                ...prevState,
                assignees:todoassignees,
                toDo: {
                    ...prevState.toDo,
                    id: selectedTodo.id,
                    task: e.target.value,
                    study:{id:selectedTodo.study.id},
                    dueDate: selectedTodo.dueDate,
                },
            };
        });
        // console.log("setUpdatedToDo", UpdatedToDo);
    }, [todoassignees,handleAddAssignees]);


    const onSubmit = useCallback(async (e) => {
        if (todoassignees.length === 0) {
            alert("담당자를 선택해주세요.");
            onClose();
            return;
        }

        //수정된 할 일이 없을 때
        if (task == selectedTodo.task) {
            alert("수정된 할 일이 없습니다.");
            onClose();
            return;
        }

        if (task == '') {
            alert("할 일을 적어주세요.");
            onClose();
            return;
        }
        console.log("todoassignees::::",todoassignees);
         console.log("setUpdatedToDo?::::", UpdatedToDo);
        onUpdate(UpdatedToDo);
    }, [onChange,todoassignees,handleAddAssignees]);

    useEffect(() => {
        if (selectedTodo) {
           // setTask(selectedTodo.task); 기존의 할 일이 보이도록
            setTask('');
        }
        console.log("selectedTodotask,",selectedTodo.task);
    }, [selectedTodo,todoassignees]);


    return (
        <div className="background">
            <form onSubmit={onSubmit} className="todoedit_insert">
                <h2>수정하기</h2>
                <div className={"select_assignee"}>
                    <p>담당자</p>
                    {Array.isArray(Member) && Member.length > 0 && Member
                        .filter(item => !todoassignees.some(assignee => assignee=== item.member.nickname))
                        .map((item, index) => (
                        <div className={"assignees"} key={index}>
                            <div
                                className="assignee-name"
                                data-assign-name={item.member.nickname}
                                onClick={handleAddAssignees}
                            >
                                {item.member.nickname}
                            </div>
                            {/*<button id={"delete_assignees"} value={item.member.name} onClick={handleRemoveAssignees}>x</button>*/}
                        </div>
                    ))}
                </div>
                <div className={"selected-assignees"}>
                    <p>선택한 담당자</p>
                        {todoassignees.map((assignee, index) => (
                            <div className={"assignees"}>
                                <div key={index}>{assignee}</div>
                                <button id={"delete_assignees"} value={assignee}
                                        onClick={handleRemoveAssignees}>x
                                </button>
                            </div>
                        ))}

                </div>
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
export default TeamToDoEdit;