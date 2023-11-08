import React, {useState, useRef} from "react";
import "../../css/user_css/Log.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import Header from "../../components/repeat_etc/Header";

const Login = () => {

    const navigate = useNavigate();
    //useNavigate 훅을 사용하여 navigate 함수를 가져옴

    const inputID = useRef();
    const inputPW = useRef();

    const [state, setState] = useState({
        ID: "",
        PW: "",
    });
    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        // console.log(e.target.name); // ID
        // console.log(e.target.value); // PW
    };

    //엔터키 눌렀을 때
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) { // 엔터 키의 키 코드는 13입니다.
            handleSubmit();
        }
    };
    const handleSubmit = () => {

        if (state.ID.length < 3) {      // TODO 아이디 및 비밀번호 입력값 최소 길이 수정 필요
            inputID.current.focus();
            return;
        }
        if (state.PW.length < 5) {
            inputPW.current.focus();
            return;
        }

        axios
            .post("http://localhost:8080/api/v2/members/login", {
                memberId: state.ID,
                password: state.PW
            }, {
                params: {
                    memberId: state.ID,
                    password: state.PW
                },
                withCredentials: true
            })
            .then((res) => {
                console.log('전송 성공');
                console.log(res.data);

                if (res.data.state === 400) {
                    alert("입력값을 확인해주세요. \n로그인 실패");
                } else {
                    const accessToken = res.data.data.accessToken;

                    // 로그인 성공 시 localstorage에 accessToken, 사용자 Id 값 저장
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('isLoggedInUserId', state.ID);

                    // 로그인 성공 시 메인 페이지로 리다이렉트
                    navigate('/'); // useNavigate를 사용하여 페이지를 이동
                }
            })
            .catch(error => {
                console.log('전송 실패', error);

                // 로그인 실패 시 현재 페이지 다시 로드
                // window.location.reload();

                alert("입력값을 확인해주세요. \n로그인 실패");
            });
    };
    return (
        <div>

            {/* <LogoButton /> */}
            {/* <div className ="Logo"> STAR D </div> */}
            <Header showSideCenter={false}/>
            <div className="containers" id="log">
                <div className="login_info">
                    <p>로그인</p>
                </div>

                <div className="input_info">
                    <div className="subinfo">아이디</div>
                    <div className="input_bottom">
                        <input
                            ref={inputID}
                            name={"ID"}
                            placeholder="아이디를 입력해주세요"
                            value={state.ID}
                            onChange={onChange}
                            // onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="subinfo">비밀번호</div>
                    <div>
                        <input
                            style={{marginLeft:"0"}}
                            ref={inputPW}
                            placeholder="비밀번호를 입력해주세요"
                            name={"PW"}
                            type={"password"}
                            value={state.PW}
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="loginbtn">
                        <button onClick={handleSubmit}>로그인</button>
                    </div>
                    <div className="findlog">
                        <Link to={"/login/findeID"}
                              style={{
                                  textDecoration: "none",
                                  color: "blue",
                              }}>
                            <span id={"id"}>아이디 찾기 / </span>
                        </Link>
                        <span id={"pw"}>비밀번호 찾기 / </span>
                        <Link to={"/subinfo"}
                              style={{
                                  textDecoration: "none",
                                  color: "blue",
                              }}>
                            <span id={"signup"}>회원가입</span></Link>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Login;
