import Header from "../../components/repeat_etc/Header";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {isEmail} from "../../util/check";


const FindPW = () => {

    const [state, setState] = useState({
            email: "",
            authCode: "",
            isEmailSent: false,
        }
    );

    const inputEmail = useRef();
    const inputAuthCode = useRef();

    const navigate = useNavigate();

    const handleEditChange = (e) => { //핸들러 나누기
        // event handler
        setState({
            ...state,
            [e.target.name]: e.target.value.toString(),
        });
    };

    const verificationEmail = (email) => {
        if (!isEmail(email)) {
            alert("유효하지 않은 email입니다.\n다시 입력해주세요.");
            return false;
        }
        return true;
    }

    const receiveAuthCode = () => {

        console.log(state.email)
        if (!verificationEmail(state.email)) {
            return;
        }

        // EmailDTO 객체 생성
        const emailDto = {
            email: state.email,
        };

        try {
            axios.post("http://localhost:8080/emails/verification-requests", emailDto)
                .then((response) => {
                    console.log("인증번호 받기 성공: ", response.data);
                    alert(state.email + "으로 인증번호를 보냈습니다.\n6자리의 숫자를 인증번호 칸에 입력하세요.")

                    // Update state to indicate that email is sent
                    setState((prev) => ({ ...prev, isEmailSent: true }));

                }).catch((error) => {
                console.log("인증번호 받기 실패", error);
            })

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const receiveCertificate = () => {

        if (state.email === "" || state.authCode === "") {
            alert("이메일과 인증번호를 모두 입력하세요.");
            return;
        }

        if (!state.isEmailSent) {
            alert("이메일로 인증번호를 먼저 전송하세요.");
            return;
        }

        if (state.authCode === "" ) {
            alert("인증 번호를 입력해주세요.")
            return;
        }

        try {
            axios.get("http://localhost:8080/emails/verifications", {
                params: {
                    email: state.email,
                    authCode: state.authCode
                }
            }).then((response) => {
                console.log("이메일 인증 성공: ", response.data);
                if (response.data) {
                    alert("이메일 인증 성공했습니다. 비밀번호 재설정해주세요.");
                    navigate("/")
                }
                else
                    alert("이메일 인증 실패했습니다. 인증 번호를 다시 확인해주세요.");

            }).catch((error) => {
                console.log("이메일 인증 실패", error);
            })

        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div>
            <Header showSideCenter={false}/>
            <div className={"page_title"}>
                <p id={"find-id"}>비밀번호 찾기</p>
            </div>
            <div className="findwrap">
                <div className={"container_findwrap"}>
                    <div className="container_find" id="logs">
                        <div className="input_infos">
                            <div className="subinfos">이메일</div>
                            <div className="subinfos2">
                                <input
                                    ref={inputEmail}
                                    name={"email"}
                                    placeholder="이메일을 입력해주세요"
                                    value={state.email}
                                    onChange={handleEditChange}
                                />
                                <div className={"Certification_Number1"}>
                                    <button onClick={receiveAuthCode}>전송</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container_find" id="phone">
                        <div className="input_phone">
                            <div className="subinfos">
                                인증번호
                            </div>
                            <div className={"inputform"}>
                                <input
                                    ref={inputAuthCode}
                                    id="phonecontent"
                                    name={"authCode"}
                                    value={state.authCode}
                                    onChange={handleEditChange}
                                    placeholder={"인증번호를 입력해주세요."}
                                ></input>
                            </div>

                        </div>
                    </div>

                    <div className={"Certification_Number"}>
                        <button onClick={receiveCertificate}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FindPW;