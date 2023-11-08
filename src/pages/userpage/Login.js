import React, {useState, useRef} from "react";
import "../../css/user_css/Log.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import Header from "../../components/repeat_etc/Header";

const Login = () => {

    const navigate = useNavigate();

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
    };

    //엔터키 눌렀을 때
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    };
    const handleSubmit = () => {

        if (state.ID.length < 3) {
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
                if (res.data.state === 400) {
                    alert("입력값을 확인해주세요.\n로그인 실패");
                } else {
                    const accessToken = res.data.data.accessToken;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('isLoggedInUserId', state.ID);

                    navigate('/'); // useNavigate를 사용하여 페이지를 이동
                }
            })
            .catch(error => {
                console.log('전송 실패', error);
                alert("입력값을 확인해주세요.\n로그인 실패");
            });
    };
    return (
        <div>
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
                            style={{marginLeft: "0"}}
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
                        <Link to={"/login/findePW"}
                              style={{
                                  textDecoration: "none",
                                  color: "blue",
                              }}>
                            <span id={"pw"}>&nbsp;비밀번호 찾기 / </span>
                        </Link>
                        <Link to={"/subinfo/signup"}
                              style={{
                                  textDecoration: "none",
                                  color: "blue",
                              }}>
                            <span id={"signup"}>&nbsp;회원가입</span></Link>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Login;
