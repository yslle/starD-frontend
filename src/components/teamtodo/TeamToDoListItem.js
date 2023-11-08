import cn from 'classnames';
import ToDoList from "../../pages/mypage/ToDoList";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import editicon from "../../images/edit.png";
import removeicon from "../../images/remove.png";
import ToDoListItems from "../../css/todo_css/ToDoListItem.css";
import React, {useEffect} from "react";

//할 일 보여주는 컴포넌트
const TeamToDoListItem = ({todo,todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle, selectedDate, Assignees}) => {
    console.log('todo:', todo);
    console.log('todos:', todos);
    // const todosString = "eeee,dddd";
    // const todosArray = todosString.split(',');
    const Assignee = todo.assignees.map((item) => item.member.name);
    const TODO = todos[0];

    // console.log('TODO:', TODO);
    console.log("넘어온 담당자 이름들", Assignee);
    return (<li key={todo.id} className="TodoListItem">
            {Assignee.map((assignee, index) => (<p key={index}>{assignee}</p>))}
            <div className={cn('checkbox', {checked: TODO.toDoStatus})}
                 onClick={() => onToggle(todo.assignees,TODO.toDo.id, TODO.toDoStatus)}>
                {TODO.toDoStatus ? <img src={checkbox} width="20px"/> : <img src={uncheckbox} width="20px"/>}
                <div className="text">{TODO.toDo.task}</div>
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
