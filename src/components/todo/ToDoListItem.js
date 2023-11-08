import cn from 'classnames';
import ToDoList from "../../pages/mypage/ToDoList";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import editicon from "../../images/edit.png";
import removeicon from "../../images/remove.png";
import ToDoListItems from "../../css/todo_css/ToDoListItem.css";
import {useEffect} from "react";

//할 일 보여주는 컴포넌트
const ToDoListItem = ({todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle, selectedDate}) => {
     console.log('todo:', todos);
    console.log('todo:', todos.toDo.id);
    // 여기에서 todos는 const filteredTodos = todoswithAssignee[dateKey] || [];
    return(
        <li key={todos.toDo.id} className="TodoListItem">
            <p>{todos.toDo.study.title}</p>
            <div className={cn('checkbox', { checked: todos.toDoStatus })} onClick={() => onToggle(todos.toDo.id, todos.toDoStatus)}>
                {todos.toDoStatus ? <img src={checkbox} width="20px" /> : <img src={uncheckbox} width="20px" />}
                <div className="text">{todos.toDo.task}</div>
            </div>
            <div className="Edit" onClick={() => {
                onInsertToggle();
                onChangeSelectedTodo(todos);
            }}>
                <img src={editicon} width="20px" />
            </div>
            <div className="Remove" onClick={() => onRemove(todos.toDo.id)}>
                <img src={removeicon} width="20px" />
            </div>
        </li>
    );
};

export default ToDoListItem;
