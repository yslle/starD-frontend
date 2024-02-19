import cn from 'classnames';
import ToDoList from "../../pages/mypage/ToDoList";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import editicon from "../../images/edit.png";
import removeicon from "../../images/remove.png";
import ToDoListItems from "../../css/todo_css/ToDoListItem.css";
import React, {useEffect, useState} from "react";

//할 일 보여주는 컴포넌트
const TeamToDoListItem = ({
                              todo,
                              todos,
                              onRemove,
                              onToggle,
                              onChangeSelectedTodo,
                              onInsertToggle,
                              selectedDate,
                              Assignees,
                              Member
                          }) => {

    useEffect(() => {
        console.log("TODO changed:", todo);
    }, [todo]);

    console.log('todo:', todo);
    console.log('todos:', todos);

    const Assignee = todo.assignees.map((item) => item.member.nickname);
    const TODO = todos[0];
    const [selectedTodo, setSelectedTodo] = useState(null);


    const loggedInUserId = localStorage.getItem('isLoggedInUserId');
    const currentUserTodoIndex = todos.findIndex(todo => todo.member.id === loggedInUserId);

    // 만약 현재 로그인한 사용자의 할 일이 존재한다면 해당 할 일의 상태를 전달합니다.
    const currentUserTodoStatus = currentUserTodoIndex !== -1 ? todos[currentUserTodoIndex].toDoStatus : false;

    console.log("currentUserTodoIndex: ", currentUserTodoIndex);
    console.log("상태..?: ", currentUserTodoStatus);

    // 모든 담당자의 toDoStatus가 true인지 확인
    const allTodoStatusTrue = todos.every(todo => todo.toDoStatus === true);
    console.log("모든 할 일의 상태가 true인가?: ", allTodoStatusTrue);

    console.log('TODO:', TODO.toDo.id);
    console.log("넘어온 담당자 닉네임들", Assignee);
    return (<li key={todo.id} className="TodoListItem">
        {Assignee.map((assignee, index) => (<p key={index}>{assignee}</p>))}
        <div className={cn('checkbox', {checked: allTodoStatusTrue})}
             onClick={() => onToggle(todo.assignees, TODO.toDo.id, currentUserTodoIndex, currentUserTodoStatus,allTodoStatusTrue)}>
            {allTodoStatusTrue ? <img src={checkbox} width="20px"/> : <img src={uncheckbox} width="20px"/>}
            <div className="text">{todo.task}</div>
        </div>
        <div className="Edit" onClick={() => {
            onInsertToggle();
            onChangeSelectedTodo(todo);
        }}>
            <img src={editicon} width="20px"/>
        </div>
        <div className="Remove" onClick={() => onRemove(TODO.toDo.id)}>
            <img src={removeicon} width="20px"/>
        </div>
    </li>);
};

export default TeamToDoListItem;
