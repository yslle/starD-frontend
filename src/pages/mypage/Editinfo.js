import React, {useState, useEffect} from "react";
import axios from "axios";
import Category from "../../components/repeat_etc/Category";
import Signout from "../../components/info/Signout.js";
import RealEstate from "../../components/info/RealEstate.js";
import {isEmail, isPassword} from "../../util/check.js";
import Backarrow from "../../components/repeat_etc/Backarrow.js";
import EditInterest from "../../components/info/EditInterest.js";
import Header from "../../components/repeat_etc/Header";

const Editinfo = ({sideheader}) => {
    const [state, setState] = useState({
        nickname: "",
        email: "",
        password: "",
        newPassword: "",
        checkNewPw: "",
        phone: "",
        isValidEmail: false,
    });

    const [mem, setMem] = useState({city:"", district:""});
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true); // nickname 중복 여부 상태 변수

    useEffect(()=>{
        const city = localStorage.getItem("selectedSido");
        const district = localStorage.getItem("selectedGugun");
        const estate = {city:city, district:district};
        setMem(estate);
    },[]);
    // //서버에 닉네임 중복확인 요청 함수
    // const checkDuplicateNicname=()=>{
    //   let body={
    //     NICNAME: state.NICNAME
    //   };
    //   console.log("바디",body);
    //   api("","POST",body)
    //   .then(res => alert(res.message))
    //   .catch(err.status == 409){
    //     alert(err.message);
    //     this.setState({
    //       NICNAME:"",

    //     });
    //   }
    // }


    const checkValidEmail = () => { //일정 시간이 지난 후 유효성 검사 및 state 변경
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            if (!isEmail(state.email)) {
                setState({isValidEmail: false});
            } else {
                setState({isValidEmail: true});
            }
        }, 300);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get("http://localhost:8080/user/mypage/update", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                const member = response.data;
                console.log(member);
                setMem(member);
                setState({
                    ...state,
                    nickname: member.nickname,
                    email: member.email,
                    phone: member.phone
                });
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    // AxiosError 처리
                    console.error("AxiosError:", error.message);
                    // 요청 실패로 인한 오류 처리를 진행하거나 사용자에게 알리는 등의 작업 수행
                } else {
                    // 일반 오류 처리
                    console.error("데이터 가져오기 중 오류 발생:", error);
                }
            });
    }, []);


    const handleEditChange = (e) => { //핸들러 나누기
        // event handler
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.name);
        console.log(e.target.value);
    };
    const handleEditemailChange = (e) => { //이메일 정규식 핸들러
        // event handler
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        checkValidEmail(); //함수 실행
        console.log(e.target.name);
        console.log(e.target.value);
    };

    const handleCheckDuplicateNickname = async () => {
        // 입력한 닉네임 가져오기
        const nickname = state.nickname;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!nickname) {
            alert("닉네임을 입력해 주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/check/nickname", null, {
            params: {nickname: nickname},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                const isDuplicate = response.data;

                setIsNicknameDuplicate(isDuplicate);

                if (isDuplicate) {
                    alert("이미 존재하는 닉네임입니다.");
                } else {
                    alert("사용 가능한 닉네임입니다.");
                }
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    // AxiosError 처리
                    console.error("AxiosError:", error.message);
                    // 요청 실패로 인한 오류 처리를 진행하거나 사용자에게 알리는 등의 작업 수행
                } else {
                    // 일반 오류 처리
                    console.error("데이터 가져오기 중 오류 발생:", error);
                }
            });
    };

    const handleSaveNickname = async () => {
        // 입력한 닉네임 가져오기
        const nickname = state.nickname;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!nickname) {
            alert("닉네임을 입력해 주세요.");
            return;
        }

        // 닉네임 중복 확인 안 함, 중복 => 처리 X
        if (isNicknameDuplicate) {
            alert("닉네임 중복 확인을 해주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/update/nickname", null, {
            params: {nickname: nickname},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("닉네임 변경 성공");
                    alert("닉네임이 변경되었습니다.");
                    setIsNicknameDuplicate(true); // 중복 확인 다시 reset
                } else {
                    console.error("닉네임 변경 실패");
                    alert("닉네임 변경에 실패하였습니다.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("닉네임 변경에 실패하였습니다.");
            });
    };

    // 이메일 인증은 아직 X
    const handleSaveEmail = async () => {
        // 입력한 이메일 가져오기
        const email = state.email;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!email) {
            alert("이메일을 입력해 주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/update/email", null, {
            params: {email: email},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("이메일 변경 성공");
                    alert("이메일이 변경되었습니다.");
                } else {
                    console.error("이메일 변경 실패");
                    alert("이메일 변경에 실패하였습니다.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("이메일 변경에 실패하였습니다.");
            });
    };

    const handleSavePassword = async () => {
        // 입력한 비밀번호 가져오기
        const password = state.password;
        const newPassword = state.newPassword;
        const checkNewPw = state.checkNewPw;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!password || !newPassword) {
            alert("비밀번호를 입력해 주세요.");
            return;
        }

        if (newPassword !== checkNewPw) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/update/password", null, {
            params: {password: password, newPassword: newPassword},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("비밀번호 변경 성공");
                    alert("비밀번호가 변경되었습니다.");
                } else {
                    console.error("비밀번호 변경 실패");
                    alert("비밀번호 변경에 실패하였습니다.");
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    console.log("비밀번호 틀림");
                    alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
                } else {
                    console.error("Error:", error);
                    alert("비밀번호 변경에 실패하였습니다.");
                }
            });
    };

    const handleSavePhone = async () => {
        // 입력한 전화번호 가져오기
        const phone = state.phone;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!phone) {
            alert("전화번호를 입력해 주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/update/phone", null, {
            params: {phone: phone},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("전화번호 변경 성공");
                    alert("전화번호가 변경되었습니다.");
                } else {
                    console.error("전화번호 변경 실패");
                    alert("전화번호 변경에 실패하였습니다.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("전화번호 변경에 실패하였습니다.");
            });
    };

    const handleSaveAddress = async () => {
        // 선택한 거주지 정보 가져오기
        const city = document.getElementById("sido1").value; //시/도
        const district = document.getElementById("gugun1").value; //구/군

        console.log("city : " + city + ", district : " + district);

        if (city === "시/도 선택" || district === "구/군 선택" || !city || !district) {
            alert("거주지를 선택해주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        axios.post("http://localhost:8080/user/mypage/update/address", null, {
            params: {city: city, district: district},
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("거주지 변경 성공");
                    alert("거주지가 변경되었습니다.");
                } else {
                    console.error("거주지 변경 실패");
                    alert("거주지 변경에 실패하였습니다.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("거주지 변경에 실패하였습니다.");
            });
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            {/*<Backarrow/>*/}
            <div className="container">
                <Category/>
                <div className="main_container" id="edit_main">
                    <p id={"main-container-title"}>개인정보 수정페이지</p>
                    <div className="sub_container" id="password">
                        <div className="change_pw">
                            <div id="title">
                                비밀번호
                                {/* <span id="sub_title">(현재 비밀번호를 입력해주세요)</span> */}
                            </div>
                            <input
                                type="password"
                                id="content"
                                name={"password"}
                                value={state.password}
                                onChange={handleEditChange}
                                placeholder="현재 비밀번호를 입력하세요."
                            ></input>
                            <input
                                type="password"
                                id="content"
                                name={"newPassword"}
                                value={state.newPassword}
                                onChange={handleEditChange}
                                placeholder="새로운 비밀번호를 입력하세요."
                            ></input>
                            <input
                                type="password"
                                id="content"
                                name={"checkNewPw"}
                                value={state.checkNewPw}
                                onChange={handleEditChange}
                                placeholder="비밀번호 확인"
                            ></input>
                            <button id="save" onClick={handleSavePassword}>저장하기</button>
                        </div>
                    </div>
                    <div className="sub_container">
                        <div className="change_nicname">
                            <div id="title">닉네임</div>
                            <div id="checkname">
                                <input
                                    id="content"
                                    name={"nickname"}
                                    value={state.nickname}
                                    onChange={handleEditChange}
                                    placeholder="닉네임을 입력하세요."
                                />
                                <button id="check_double_nicname" onClick={handleCheckDuplicateNickname}>중복확인</button>
                            </div>

                            <button id="save" onClick={handleSaveNickname}>저장하기</button>
                        </div>
                    </div>
                    <div className="sub_container" id="phone_number">
                        <div className="change_phone">
                            <div id="title">
                                전화번호
                                <span id="sub_title">(-없이 전화번호만 입력)</span>
                            </div>

                            <input
                                id="content"
                                name={"phone"}
                                value={state.phone}
                                onChange={handleEditChange}
                                placeholder={"전화번호를 입력해주세요."}
                            ></input>

                            <button id="save" onClick={handleSavePhone}>저장하기</button>
                        </div>
                    </div>
                    <div className="sub_container" id="c_email">
                        <div className="change_email">
                            <div id="title">
                                이메일<span id="sub_title">(이메일 변경 후 재인증 필요)</span>
                            </div>
                            <input
                                id="content"
                                name={"email"}
                                value={state.email}
                                onChange={handleEditemailChange}
                                placeholder="이메일을 입력하세요."
                            />
                            {state.email != "" ? (
                                state.isValidEmail ? (
                                    <p style={{color: "blue"}}>사용가능한 email입니다.</p>
                                ) : (
                                    <p style={{color: "red"}}>유효하지 않은 email입니다.</p>
                                )
                            ) : null}
                            <button id="save" onClick={handleSaveEmail}>저장하기</button>
                        </div>
                    </div>
                    <div className="sub_container">
                        <div className="change_estate">
                            <div id="title" style={{padding:"0"}}>거주지</div>
                            <div id="checkestate">
                                {mem && <RealEstate mem={mem}/>}
                                {/*<RealEstate/>*/}
                            </div>

                            <button id="save" onClick={handleSaveAddress}>저장하기</button>
                        </div>
                    </div>
                    <div className="sub_container" id="interested">
                        <div className="change_interest">
                            <EditInterest mem = {mem}/>
                            {/*<button id="save">저장하기</button>*/}
                        </div>
                    </div>
                    <Signout/>
                </div>
            </div>
        </div>
    );
};
export default Editinfo;
