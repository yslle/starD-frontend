import React, {useCallback, useEffect, useState} from "react";
import RealEstate from "../info/RealEstate";
import StudyRegion from "./StudyRegion";
import axios from "axios";

const StudyEdit = ({study, onUpdateStudy, onCancel}) => {

    // console.log("StudyEdit :", study); //스터디 아이템
    const [updatedStudy, setUpdatedStudy] = useState(study);
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [updatedTitle, setUpdatedTitle] = useState(""); //제목
    const [updatedCapacity, setUpdatedCapacity] = useState(""); //제목
    const [updatedStartDate, setUpdatedStartDate] = useState(""); //시작일
    const [updatedEndDate, setUpdatedEndDate] = useState(""); //끝나는 일
    const tagoptions = [
        {value: "웹 개발", name: "웹 개발"},
        {value: "앱 개발", name: "앱 개발"},
        {value: "머신러닝", name: "머신러닝"},
        {value: "데이터 분석", name: "데이터 분석"},
        {value: "게임 개발", name: "게임 개발"},
        {value: "블록체인", name: "블록체인"},
        {value: "네트워크 보안", name: "네트워크 보안"},
        {value: "클라우드 컴퓨팅", name: "클라우드 컴퓨팅"},
        {value: "인공지능", name: "인공지능"},
        {value: "사이버 보안", name: "사이버 보안"},
        {value: "소프트웨어 테스트", name: "소프트웨어 테스트"},
        {value: "로봇공학", name: "로봇공학"},
        {value: "사물인터넷 (IoT)", name: "사물인터넷 (IoT)"},
        {value: "데이터베이스 관리", name: "데이터베이스 관리"},
        {value: "UI/UX 디자인", name: "UI/UX 디자인"},
        {value: "프로젝트 관리", name: "프로젝트 관리"},
        {value: "빅데이터", name: "빅데이터"},
        {value: "컴퓨터 그래픽스", name: "컴퓨터 그래픽스"},
        {value: "자동화", name: "자동화"},
        {value: "블로그 운영", name: "블로그 운영"},
    ];

    // const { title, field, author, number, onoff, sido, gugun, deadline, startDate, endDate, description, tag, created_date, current,scrap, like} = study;

    const handleRadioChange = useCallback((e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            onoff: selectedValue,
        }));
        console.log(selectedOption)
        setShowSelect(selectedValue === "offline" || selectedValue === "both");
    }, [selectedOption]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            [name]: value,
        }));
        console.log("updatedStudy", updatedStudy);
    }

    const handleRegionCityChange = (newCity) => {
        setCity(newCity);
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            sido: newCity,
        }));
    };

    const handleRegionDistrictChange = (newDistrict) => {
        setDistrict(newDistrict);
        setUpdatedStudy((prevStudy) => ({
            ...prevStudy,
            gugun: newDistrict,
        }));
    };

    const handleUpdateClick = useCallback(() => {
        console.log("수정될 데이터들:", updatedStudy);
        onUpdateStudy(updatedStudy);
    }, [updatedStudy,handleInputChange]);

    useEffect(() => {
        if (updatedStudy.onOff === "offline" || updatedStudy.onOff === "both") {
            setShowSelect(true);
        } else if (updatedStudy.onOff === "online") {
            setShowSelect(false);
        }
    }, []);

    const studyeditform = () => {
        return (
            <form className="study_open_form">
                <div>
                    <div className="left">
                        <div>
                            <span>제목</span>
                            <input type="text" name="title" value={updatedStudy.title} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                        <div>
                            <span>모집 인원</span>
                            <input type="text" name="number" value={updatedStudy.capacity} onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                        <div>
                            <span>스터디 시작일</span>
                            <input type="date" name="activityStart" value={updatedStudy.activityStart}
                                   onChange={handleInputChange} className="inputbox"/>
                        </div>
                        <div>
                            <span>모집 마감일</span>
                            <input type="date" name="deadline" value={updatedStudy.recruitmentDeadline}
                                   onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>
                    </div>
                    <div className="right">
                        <div style={{marginRight: "10px"}}>
                            <span>분야</span>
                            <input type="text" name="tag" value={updatedStudy.tags} onChange={handleInputChange}
                                   className="inputbox"/>
                            <span className="field_wrapper">
                                <select name="field" value={updatedStudy.field} onChange={handleInputChange}>
                                    {tagoptions.map((interest, idx) =>
                                        <option key={idx} value={interest.value}>{interest.name}</option>
                                    )}
                                </select>
                            </span>
                        </div>
                        <div style={{marginRight: "10px"}}>
                            <span className="onoff_title">진행 방식</span>
                            <div className="onoff">
                                <input type="radio" value="online" name="onOff" onChange={handleRadioChange}
                                       checked={updatedStudy.onOff === "online" || selectedOption === "online"}/>온라인
                                <input type="radio" value="offline" name="onOff" onChange={handleRadioChange}
                                       checked={updatedStudy.onOff === "offline" || selectedOption === "offline"}/>오프라인
                                <input type="radio" value="both" name="onOff" onChange={handleRadioChange}
                                       checked={updatedStudy.onOff === "both" || selectedOption === "both"}/>무관
                                {showSelect && (
                                    <StudyRegion formData={updatedStudy} city={updatedStudy?.city}
                                                 district={updatedStudy?.district}
                                                 handleRegionCityChange={handleRegionCityChange}
                                                 handleRegionDistrictChange={handleRegionDistrictChange}/>
                                )}
                            </div>
                        </div>
                        <div>
                            <span>스터디 종료일</span>
                            <input type="date" name="activityDeadline" value={updatedStudy.activityDeadline}
                                   onChange={handleInputChange}
                                   className="inputbox"/>
                        </div>

                    </div>
                </div>
                <div className="study_open_detail">
                    <span>상세 내용</span>
                    <textarea name="content" onChange={handleInputChange}
                              value={updatedStudy.content}/>
                </div>
                <div className="btn">
                    <button onClick={handleUpdateClick} className="recruit_btn">저장</button>
                    <button onClick={onCancel} className="recruit_btn">취소</button>
                </div>
            </form>
        )
    }
    return (<div>
        {studyeditform()}
    </div>);
}
export default StudyEdit;