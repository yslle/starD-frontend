import React, {useState, useRef, useCallback, useEffect} from "react";
import Category from "../../components/repeat_etc/Category.js";
import ScheduleCalender from "../../components/schedule/ScheduleCalender.js";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import AddSchedule from "../../components/schedule/AddSchedule.js";
import Header from "../../components/repeat_etc/Header";
import axios from "axios";

const Schedule = ({sideheader}) => {
    const [meetings, setMeetings] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date()); // 추가: 선택한 날짜 상태
    const [addToggle, setAddToggle] = useState(false); //일정 추가 +토글버튼 상태

    const Year = selectedDate.getFullYear();
    const Month = selectedDate.getMonth() + 1;
    const Dates = selectedDate.getDate();
    // TODO 백엔드 연동
    const sendMeetingsToBackend = () => {
        const backendEndpoint = "https://your-backend-url.com/save-meetings";

        const meetingsDataToSend = [];
      //meetings의 객체의 키인 dateKey를 반복해서 돌고
        for (const dateKey in meetings) {
          //meetings[dateKey]의 객체 배열의 키인 studyKey를 반복해서 돌고
            for (const studyKey in meetings[dateKey]) {
              //일정을 가져와서
                for (const meeting of meetings[dateKey][studyKey]) {
                    const {
                        id,
                        study,
                        start_date,
                        end_date,
                        title,
                        content,
                        color,
                    } = meeting; //각 변수에 비구조화할당 후
                  //배열에 push해주었습니다.
                    meetingsDataToSend.push({
                        id,
                        study,
                        start_date,
                        end_date,
                        title,
                        content,
                        color,
                    });
                }
            }
        }
        //meetingsDataToSend배열을 axios로 전달
        axios.post(backendEndpoint, {meetings: meetingsDataToSend})
            .then(response => {
                console.log("Meetings sent to the backend:", response.data);
                //로그아웃할 때까지 저장
                //다시 로그인했을 때에도 추가했던 일정들이 사라지지 않고 그대로 존재
            })
            .catch(error => {
                console.error("Error sending meetings to the backend:", error);
            });
    };

    const handleToggle = (day) => {
        setSelectedDate(new Date(day));
        console.log("클릭한 날짜11");
        console.log(selectedDate);
        setAddToggle((prev) => !prev);
    };
    const nextId = useRef(1);

    //일정 추가 함수
    const onInsert = useCallback(
        (start_date, end_date, title, content, study, color) => {

            const startDay = new Date(start_date);
            const startDates = new Date(selectedDate);
            const endDay = new Date(end_date);
            const newMeetings = {...meetings}; // Create a copy of the meetings object
            console.log("newMeetings: ", newMeetings);
            //시작일부터 끝까지 반복문
            while (startDay <= endDay) {
                const dateKey = startDay.toDateString();
                const endKey = endDay.toDateString();
                const meeting = {
                    id: nextId.current,
                    start_date: dateKey,
                    end_date: endKey, // Set the same end_date as start_date for each day
                    title,
                    content,
                    study,
                    color,
                };

                newMeetings[dateKey] = {
                    ...(newMeetings[dateKey] || {}),
                    [study]: [...(newMeetings[dateKey]?.[study] || []), meeting],
                };

                startDay.setDate(startDay.getDate() + 1); // Move to the next day
            }
            nextId.current += 1;
            setMeetings(newMeetings);
            console.log("setMeetings: ", meetings);
            handleToggle(end_date);
        },
        [meetings, selectedDate]
    );

    //일정 수정 함수
    const onUpdate = (
        id,
        start_date,
        newEndDate,
        newTitle,
        newContent,
        oldStudy,
        newStudy,
        newColor
    ) => {
        console.log(`oldStudy: `, oldStudy);
        console.log(`newStudy: `, newStudy); // 수정된 스터디 잘 받아옴

        const updatedMeetings = {...meetings}; // 기존의 일정들 복사
        // Date 객체의 getTime() 메서드는 1970년 1월 1일 00시 00분 00초 UTC를 기준으로 경과한 밀리초를 반환합니다.
        const startDateKey = new Date(start_date).getTime();
        const newEndDateKey = new Date(newEndDate).getTime();

        // 시작날부터 끝나는 날까지 한 바퀴 돌리는 for문
        for (
            let currentDateTimestamp = startDateKey;
            currentDateTimestamp <= newEndDateKey;
            currentDateTimestamp += 24 * 60 * 60 * 1000
        ) {
            const currentDate = new Date(currentDateTimestamp);
            const currentDateKey = currentDate.toDateString();

            // 해당 날짜에 아무것도 없을 때 객체 형식으로 초기화
            if (!updatedMeetings[currentDateKey]) {
                updatedMeetings[currentDateKey] = {};
            }

            if (oldStudy !== newStudy) {
                // oldStudy와 newStudy가 다를 때 기존 일정을 업데이트 (일정의 스터디 종류를 바꿨을 때)
                if (updatedMeetings[currentDateKey][oldStudy]) {
                    const existingMeetingIndex = updatedMeetings[currentDateKey][oldStudy].findIndex(
                        (meeting) => meeting.id === id
                    );

                    if (existingMeetingIndex !== -1) {
                        // Update oldStudy to newStudy and replace the key in the object
                        const existingMeeting = updatedMeetings[currentDateKey][oldStudy][existingMeetingIndex];
                        updatedMeetings[currentDateKey][newStudy] = updatedMeetings[currentDateKey][newStudy] || [];
                        updatedMeetings[currentDateKey][newStudy].push({
                            ...existingMeeting,
                            id: id,
                            start_date: start_date.toDateString(),
                            end_date: newEndDate.toDateString(),
                            title: newTitle,
                            content: newContent,
                            study: newStudy,
                            color: newColor,
                        });

                        // 옛날 스터디의 키를 지움
                        updatedMeetings[currentDateKey][oldStudy].splice(existingMeetingIndex, 1);

                        // 옛날 스터디에 아무것도 없으면 삭제
                        if (updatedMeetings[currentDateKey][oldStudy].length === 0) {
                            delete updatedMeetings[currentDateKey][oldStudy];
                        }
                    }

                } else {
                    // 특정 날짜에 oldStudy가 없으면 newStudy로 새로 만든다.
                    updatedMeetings[currentDateKey][newStudy] = updatedMeetings[currentDateKey][newStudy] || [];

                    updatedMeetings[currentDateKey][newStudy].push({
                        id: id,
                        start_date: start_date.toDateString(),
                        end_date: newEndDate.toDateString(),
                        title: newTitle,
                        content: newContent,
                        study: newStudy,
                        color: newColor,
                    });
                }
            } else if (oldStudy === newStudy) {
                // oldStudy와 newStudy가 같을 때 새로운 일정을 추가 또는 업데이트
                if (!updatedMeetings[currentDateKey][newStudy]) {
                    updatedMeetings[currentDateKey][newStudy] = [];
                }

                const existingMeetingIndex = updatedMeetings[currentDateKey][newStudy].findIndex(
                    (meeting) => meeting.id === id
                );

                if (existingMeetingIndex !== -1) {
                    updatedMeetings[currentDateKey][newStudy][existingMeetingIndex] = {
                        id: id,
                        start_date: start_date.toDateString(),
                        end_date: newEndDate.toDateString(),
                        title: newTitle,
                        content: newContent,
                        study: newStudy,
                        color: newColor,
                    };
                } else {
                    updatedMeetings[currentDateKey][newStudy].push({
                        id: id,
                        start_date: start_date.toDateString(),
                        end_date: newEndDate.toDateString(),
                        title: newTitle,
                        content: newContent,
                        study: newStudy,
                        color: newColor,
                    });
                }
            }
        }
        for (const currentDateKey in updatedMeetings) {
            const currentDateTimestamp = new Date(currentDateKey).getTime();
            if (
                currentDateTimestamp >= startDateKey &&
                currentDateTimestamp <= newEndDateKey
            ) {
                for (const currentStudy in updatedMeetings[currentDateKey]) {
                    if (newStudy !== currentStudy) {
                        // delete updatedMeetings[currentDateKey][currentStudy];
                        continue;
                    }
                }
            } else {
                // 범위에 속하지 않는 경우 해당 스터디 데이터 삭제
                delete updatedMeetings[currentDateKey];
            }
        }

        setMeetings(updatedMeetings);
    };

    useEffect(() => {
        console.log("수정함", meetings);
    }, [meetings]);

    //일정 삭제 함수
    const onRemove = (id) => {
        const updatedMeetings = {...meetings};

        // 업데이트된 일정들의 날짜키를 반복
        for (const dateKey in updatedMeetings) {
            // 업데이트된 일정들의 특정 날짜의 키인 스터디 키 반복
            for (const studyKey in updatedMeetings[dateKey]) {
                // Find the index of the meeting with the provided id
                const meetingIndex = updatedMeetings[dateKey][studyKey].findIndex(
                    (meeting) => meeting.id === id
                );

                if (meetingIndex !== -1) {
                    // Remove the meeting from the array
                    updatedMeetings[dateKey][studyKey].splice(meetingIndex, 1);

                    // If the array is now empty, delete the study key
                    if (updatedMeetings[dateKey][studyKey].length === 0) {
                        delete updatedMeetings[dateKey][studyKey];
                    }

                    // If the date key is now empty, delete it
                    if (Object.keys(updatedMeetings[dateKey]).length === 0) {
                        delete updatedMeetings[dateKey];
                    }
                }
            }
        }

        setMeetings(updatedMeetings);
    };

    useEffect(() => {
        console.log("meetings:", meetings);
    }, [meetings]);

    useEffect(() => {
        const storedMeetings = JSON.parse(localStorage.getItem("schedule"));
        console.log("Retrieved meetings from localStorage:", storedMeetings);

        if (storedMeetings) {
            setMeetings(storedMeetings);
        }
    }, []);

    useEffect(() => {
        //로컬스토리지에 저장
        localStorage.setItem("schedule", JSON.stringify(meetings));
    }, [meetings]);


    return (
        <div>
           <Header showSideCenter={true}/>
            <Backarrow subname={"스터디 모임 일정"}/>
            <div className="container">
                <div className="main_container">
                    <div className="sub_container" id="todo_sub">
                        <Category/>
                        <ScheduleCalender
                            onDateClick={handleToggle}
                            meetings={meetings}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    </div>
                    {addToggle && (
                        <AddSchedule
                            selectedDate={selectedDate}
                            onInsert={onInsert}
                            onClose={() => {
                                setAddToggle(false);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default Schedule;
