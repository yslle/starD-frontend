import Header from "../../components/repeat_etc/Header";
import React, {useState} from "react";
import Find from "../../css/user_css/Find.css"
import axios from "axios";

const FindID = () => {
    const [state, setState] = useState({
            "Email": "",
            "phone": "",
            "certification": "",
        }
    );

    const onChange = (e) => {
        setState(state.Email);
    }
    const onhandlecertification = (e) => {
        setState(state.certification);
    }
    const options = [
        {value: "+82", name: "대한민국"},
        {value: "+81", name: "일본"},
        {value: "+1", name: "미국,캐나다"},
        {value: "+49", name: "독일"},
        {value: "+61", name: "오스트레일리아"},
        {value: "+233", name: "가나"},
        {value: "+241", name: "가봉"},
    ];

    const SelectBox = (props) => { //전화번호 나라 선택
        const handleChange = (e) => {
            // event handler
            console.log(e.target.value);
        };
        return (
            <select onChange={handleChange}>
                {props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        defaultValue={props.defaultValue}
                    >
                        <span>{option.value} {option.name}</span>
                    </option>
                ))}
            </select>
        );
    };
    const handleEditChange = (e) => { //핸들러 나누기
        // event handler
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.name);
        console.log(e.target.value);

        try {
            const response = axios.post("http://localhost:8080//member/find-id", {
                "phone": state.phone,
            });

                // if (response.status === 200) {
                //     console.log("인증번호 받기 성공");
                //     window.location.href = "/";
                // } else {
                //     console.error("인증번호 받기  실패");
                // }
            } catch (error) {
                console.error("Error:", error);
            }
            };

const receiveCertificate=()=>{
    // try {
    //     const response =   axios.post("http://localhost:8080//member/find-id", {
    //         "ID": state.ID,
    //         "phone": state.phone,
    //         "certification":state.certification,
    //     });
    //
    //     if (response.status === 200) {
    //         console.log("아이디 찾기 성공");
    //         window.location.href = "/";
    //     } else {
    //         console.error("아이디찾기 실패");
    //     }
    // } catch (error) {
    //     console.error("Error:", error);
    // }
}


    return (
        <div>
            <Header showSideCenter={false}/>
            <div className="findwrap">
                <div className={"container_findwrap"}>
                    <div className="container_find" id="logs">
                        <div className="input_infos">
                            <div className="subinfos">이메일</div>
                            <div>
                                <input
                                    name={"Email"}
                                    placeholder="이메일을 입력해주세요"
                                    value={state.Email}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container_find" id="phone">
                        <div className="input_phone">
                            <div className="subinfos">
                                전화번호
                                <span id="detail">(-없이 전화번호만 입력)</span>
                            </div>
                            <div className={"inputform"}>
                                <input
                                    id="phonecontent"
                                    name={"phone"}
                                    value={state.phone}
                                    onChange={handleEditChange}
                                    placeholder={"전화번호를 입력해주세요."}
                                ></input>
                                <div className="select_country">
                                    <SelectBox options={options} defaultValue="       "/>
                                </div>
                                <div className={"Certification_Number"}>
                                    <button onClick={receiveCertificate}>인증번호 받기</button>
                                </div>
                                <div className={"receive_number"}>
                                    <input id="receive_num"
                                           name={"num"}
                                           value={state.certification}
                                           onChange={onhandlecertification}
                                           placeholder={"인증번호를 입력해주세요."}></input>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FindID;