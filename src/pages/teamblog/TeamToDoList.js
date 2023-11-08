import React, { useState, useRef, useCallback, useEffect } from "react";
import Category from "../../components/repeat_etc/Category";
import Mypage from "../../css/mypage_css/Mypage.css";
import Editcss from "../../css/todo_css/ToDoEdit.css";
import ToDo from "../../css/todo_css/ToDo.css";
import ToDoListItems from "../../css/todo_css/ToDoListItem.css";
import ToDoInserts from "../../css/todo_css/ToDoInsert.css";
import Calender from "../../components/calender/Calender.js";
import { format, subMonths, addMonths } from "date-fns";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import Header from "../../components/repeat_etc/Header";
import { useLocation } from "react-router-dom";
import TeamToDoInsert from "../../components/teamtodo/TeamToDoInsert";
import TeamToDoListItem from "../../components/teamtodo/TeamToDoListItem";
import TeamToDoEdit from "../../components/teamtodo/TeamToDoEdit";
const TeamToDoList = ({ sideheader }) => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [insertToggle, setInsertToggle] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태

    const Year = selectedDate.getFullYear();
    const Month = selectedDate.getMonth()+1;
    const Dates = selectedDate.getDate();
    const [studies, setStudy]= useState([]);

    const location = useLocation();

    const onInsertToggle = () => {
        if (selectedTodo) {
            setSelectedTodo(null);
        }
        setInsertToggle((prev) => !prev);
    };

    const onChangeSelectedTodo = (todo) => {
        setSelectedTodo(todo);
    };

    const [todos, setTodos] = useState({}); //투두만
    const [todoswithAssignee, setTodoswithAssignee] = useState({}); //투두랑 담당자 함친 객체 배열 state

    //새로운 일정 추가
    const nextId = useRef(1);

    useEffect(() => {
        // Load todos from localStorage when the component mounts
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        // Save todos to localStorage whenever todos change
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    //할일 추가 함수
    const onInsert = useCallback(
        (title,task) => {
            const dateKey = selectedDate.toDateString();
            const todo = {
                id: nextId.current,
                title,
                task,
                checked: false,
                date: dateKey,
            };
            const assignee ={
                todo:todo,
                toDoStatus :false,
            }
            setTodoswithAssignee((prevTodos) => ({
                ...prevTodos,
                [dateKey]: [...(prevTodos[dateKey] || []), assignee],
            }));

            nextId.current++;
        },
        [selectedDate]
    );

    const dateKey = selectedDate.toDateString();
    console.log(`dateKey: ${dateKey}`);

    const filteredTodos = todoswithAssignee[dateKey] || [];
    console.log("todoswithAssignee",filteredTodos);

    //삭제 함수
    const onRemove = useCallback( //todos.todo의 id
        (id) => {
            console.log("id",id);
            alert("삭제하시겠습니까?");
            const updatedTodos = {...todoswithAssignee};
            Object.keys(updatedTodos).forEach((dateKey)=>{
                updatedTodos[dateKey] = updatedTodos[dateKey].filter((todo)=>todo.todo.id !==id);
            });
            setTodoswithAssignee(updatedTodos);
            // console.log("RemovetodoswithAssignee",todoswithAssignee);
        },[todoswithAssignee]

    );

    //수정 함수
    const onUpdate =useCallback((id, title, task) => {
        onInsertToggle();
        setTodoswithAssignee((prevTodos) => {
            const updatedTodos = { ...prevTodos };
            Object.keys(updatedTodos).forEach((dateKey) => {
                updatedTodos[dateKey] = updatedTodos[dateKey].map((todo) =>
                    todo.todo.id === id ? { todo: { ...todo.todo, title, task }, toDoStatus: todo.toDoStatus } : todo
                );
            });
            return updatedTodos;
        });
    }, []);


    //체크 버튼 바꾸는 함수
    const onToggle = useCallback(
        (id) => {
            const updatedTodos = Object.keys(todos).reduce((acc, dateKey) => {
                const updatedTodosForKey = todos[dateKey].map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                );
                acc[dateKey] = updatedTodosForKey;
                return acc;
            }, {});

            setTodos(updatedTodos);
        },
        [todos]
    );

    const handleDateClick = (day) => {
        setSelectedDate(new Date(day));
        console.log(`선택한 날짜 : ${day}`);
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            {/*<Backarrow subname={"투두 리스트 & 일정"}/>*/}
            <div className="container">
                <Category />
                <div className="main_container">
                    <p id={"main-container-title"}>투두 리스트 & 일정</p>
                    <div className="sub_container" id="todo_sub">
                        <div className="todo_container">
                            <div className="today">
                                {" "}
                                <span>{`오늘은 ${Year}년 ${Month}월 ${Dates}일입니다.`}</span>
                            </div>
                            <TeamToDoInsert onInsert={onInsert} dueDate={selectedDate}/>
                            <ul className="TodoList">
                                {filteredTodos.length === 0 && (
                                    <div className="alert_empty_todo">
                                        <span>할 일이 없습니다.<br/>  할 일을 입력해주세요.</span>
                                    </div>
                                )}
                                {filteredTodos.map((todo) => (
                                    <TeamToDoListItem
                                        todos={todo}
                                        key={todo.id}
                                        onRemove={onRemove}
                                        onToggle={onToggle}
                                        onChangeSelectedTodo={onChangeSelectedTodo}
                                        onInsertToggle={onInsertToggle}
                                        selectedDate={selectedDate}
                                    />
                                ))}
                            </ul>
                            {insertToggle && (
                                <TeamToDoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
                            )}
                        </div>
                        <Calender todo={todos} onDateClick={handleDateClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeamToDoList;
