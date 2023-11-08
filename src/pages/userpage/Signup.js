import LogoButton from "../../components/repeat_etc/LogoButton";
import React, {useState, useRef, useEffect, useCallback} from "react";
import {isEmail, isPassword, isPhone} from "../../util/check.js";
import "../../css/user_css/Log.css";
import Header from "../../components/repeat_etc/Header";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import cn from "classnames";
import Terms_of_service from "../../components/info/Terms_of_service";

const Signup = () => {
    const location = useLocation();
    let locations = {}
    // 2. location.state 에서 파라미터 취득
    //건너뛰기 누르면 null출력
    useEffect(() => {
        locations = location.state;
        console.log(locations);
    }, []);

    const inputID = useRef();
    const inputPW = useRef();
    const inputName = useRef();
    const inputNicname = useRef();
    const inputphone = useRef();
    const inputemail = useRef();
    const IDRef = useRef();
    const nicknameRef = useRef();

    ///변수명 변경
    const [state, setState] = useState({
        id: "",
        password: "",
        name: "",
        nickname: "",
        phone: "",
        email: "",
        isValidEmail: false,
        isValidPassword: false,
        isValidPhone:false,
        city: locations.city,
        district: locations.district,
        tags: locations.tags,

    });

    const [isIdDuplicate, setIsIdDuplicate] = useState(true); // id 중복 여부 상태 변수
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(true); // nickname 중복 여부 상태 변수
    const [termToggle, setTermToggle] = useState(false);
    const [CheckImg, setCheckImg] = useState(false);

    //모달창 보여주기 위한 상태 함수
    const onTermToggle = useCallback(
        () => {
            setTermToggle(true);
        },);

    //체크버튼 클릭시
    const onCheckImg = useCallback(
        () => {
            // onTermToggle();

            if(CheckImg === false){
                alert("이용약관을 확인해주세요.");
                setTermToggle(true);
                return;
            }else{
                setCheckImg(!CheckImg);
            }


        },);

    //이용약관에 이미 체크가 되어있는데 또 이용약관을 보러 클릭했을 시
    const onCheckImgs = useCallback(
        () => {
            // onTermToggle();
            setCheckImg(true);
        },);

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.name);
        console.log(e.target.value);
    };

    // 이메일 핸들러
    const handleEditemailChange = (e) => {
        const Email = e.target.value;

        setState((prevState) => ({
            ...prevState,
            email: Email,
            isValidEmail: isEmail(Email), // 이메일 유효성 검사
        }));
    };

    // 비밀번호 핸들러
    const handleEditPasswordChange = (e) => {
        const PW = e.target.value;

        setState((prevState) => ({
            ...prevState,
            password: PW,
            isValidPassword: isPassword(PW), // 비밀번호 유효성 검사
        }));
    };

    const handleEditPhoneChange = (e) => {
        const phone = e.target.value;

        setState((prevState) => ({
            ...prevState,
            phone: phone,
            isValidPhone: isPhone(phone), // 비밀번호 유효성 검사
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 제출 이벤트 방지

        console.log("handleSubmit 함수 호출");
        console.log("isIdDuplicate 상태:", isIdDuplicate);
        console.log("isNicknameDuplicate 상태:", isNicknameDuplicate);

        // 입력 값 유효성 검사
        if (
            state.id.length < 1 &&
            state.password.length < 1 &&
            state.name.length < 1 &&
            state.nickname.length < 1 &&
            state.phone.length < 1 &&
            state.email.length < 1
        ) {

            alert("회원 정보를 입력해 주세요.");
            return;
        }

        if (state.id.length < 3) {
            inputID.current.focus();
            alert("아이디는 3자 이상이어야 합니다.");
            return;
        }

        if (state.password.length < 5) {
            inputPW.current.focus();
            alert("비밀번호는 8자 이상이어야 합니다.");
            return;
        }

        if (state.name.length < 2) {
            inputName.current.focus();
            alert("이름은 2자 이상이어야 합니다.");
            return;
        }

        if (state.nickname.length < 2) {
            inputNicname.current.focus();
            alert("닉네임은 2자 이상이어야 합니다.");
            return;
        }

        if (state.phone.length < 7) {
            inputphone.current.focus();
            alert("전화번호는 7자 이상이어야 합니다.");
            return;
        }

        if (state.email.length < 1) {
            inputemail.current.focus();
            alert("이메일을 입력해 주세요.");
            return;
        }

        // 비밀번호 정규식 검증
        if (!isPassword(state.password)) {
            inputPW.current.focus();
            alert("비밀번호는 8 ~ 15자 영문, 숫자, 특수문자 조합이어야 합니다.");
            return;
        }

        // 이메일 정규식 검증
        if (!isEmail(state.email)) {
            inputemail.current.focus();
            alert("유효한 이메일 주소를 입력해 주세요.");
            return;
        }

        // id 중복 확인을 안 한 경우, 중복인 경우 가입 처리하지 않음
        if (isIdDuplicate) {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }

        // 닉네임 중복 확인을 안 한 경우, 중복인 경우 가입 처리하지 않음
        if (isNicknameDuplicate) {
            alert("닉네임 중복 확인을 해주세요.");
            return;
        }

        // 약관 동의 여부 확인
        if (!CheckImg) {
            alert("이용약관을 동의해주세요");
            return;
        }

        //TODO 희망사항: 회원가입했던 정보를 개인정보 수정페이지에 (닉네임, 이메일,전화번호)placeholder로 설정
        try {
            const response = await axios.post("http://localhost:8080/signup", {
                id: state.id,
                password: state.password,
                name: state.name,
                nickname: state.nickname,
                phone: state.phone,
                email: state.email,
                city: locations.city,
                district: locations.district,
                tags: locations.tags,
            });

            if (response.status === 200) {
                console.log("회원가입(STEP1) 성공");

                // 회원 아이디를 로컬 스토리지에 저장하거나 다른 페이지로 전달할 수 있음
                const newMember = response.data;
                const memberId = newMember.id;
                localStorage.setItem("memberId", memberId);
                console.log("반환된 아이디: ", memberId);

                window.location.href = "/subinfo?memberId=${memberId}";
            } else {
                alert("회원가입에 실패하였습니다.");
                console.error("회원가입 실패");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 중복 아이디 검증
    const handleCheckDuplicateID = async () => {
        // 입력한 아이디 가져오기
        const id = state.id; // state에서 아이디 값을 가져오기

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!id) {
            alert("아이디를 입력해 주세요.");
            return;
        }

        // 이전 메시지 삭제
        if (IDRef.current) {
            IDRef.current.remove();
        }

        try {
            // 서버에 아이디 중복 검증 요청 보내기
            const response = await axios.get("http://localhost:8080/checkDuplicateID", {
                params: {id: id},
            });

            // 서버로부터 받은 응답 확인
            const isDuplicate = response.data;

            console.log("handleCheckDuplicateID 함수 호출");
            console.log("isDuplicate 상태:", isDuplicate);

            setIsIdDuplicate(isDuplicate);

            const message = document.createElement("p");
            message.textContent = isDuplicate ? "이미 존재하는 아이디입니다." : "사용 가능한 아이디입니다.";
            message.style.display = "block"; // 줄 바꿈을 하도록 설정
            message.style.color = isDuplicate ? "red" : "blue"; // 적절한 스타일 지정

            inputID.current.parentNode.parentNode.appendChild(message);

            // 새 메시지를 관리하기 위해 messageRef 업데이트
            IDRef.current = message;

        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 중복 닉네임 검증
    const handleCheckDuplicateNickname = async () => {
        // 입력한 닉네임 가져오기
        const nickname = state.nickname;

        // 입력 값이 없는 경우 요청을 보내지 않음
        if (!nickname) {
            alert("닉네임을 입력해 주세요.");
            return;
        }

        // 이전 메시지 삭제
        if (nicknameRef.current){
            nicknameRef.current.remove();
        }

        try {
            // 서버에 닉네임 중복 검증 요청 보내기
            const response = await axios.get("http://localhost:8080/checkDuplicateNickname", {
                params: {nickname: nickname},
            });

            // 서버로부터 받은 응답 확인
            const isDuplicate = response.data;

            console.log("handleCheckDuplicateNickname 함수 호출");
            console.log("isDuplicate 상태:", isDuplicate);

            setIsNicknameDuplicate(isDuplicate);

            const message = document.createElement("p");
            message.textContent = isDuplicate ? "이미 존재하는 닉네임입니다." : "사용 가능한 닉네임입니다.";
            message.style.display = "block"; // 줄 바꿈을 하도록 설정
            message.style.color = isDuplicate ? "red" : "blue"; // 적절한 스타일 지정

            inputNicname.current.parentNode.parentNode.appendChild(message);

            // 새 메시지를 관리하기 위해 messageRef 업데이트
            nicknameRef.current = message;
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header showSideCenter={false}/>

            <div className="containers" id="sign">
                <div className="login_info">
                    <p>회원가입 <span style={{color:"red"}}>(STEP 1)</span></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input_info" style={{left:"31px"}}>
                        <div className="subinfo">아이디<span className="require_info">*</span></div>
                        <div className="signup_id input_bottom">
                            <div style={{display:"flex"}}>
                                <input
                                    ref={inputID}
                                    name={"id"} // Member 클래스의 필드 이름과 일치해야 함
                                    value={state.id} // state에서 사용하는 이름도 Member 클래스의 필드 이름과 일치해야 함
                                    onChange={onChange}
                                    placeholder="아이디를 입력해주세요."
                                    style={{marginBottom:"0"}}
                                />
                                <button id="signup_nicname_btn" type="button" onClick={handleCheckDuplicateID}>
                                    중복확인
                                </button>
                            </div>
                        </div>

                        <div className="subinfo">비밀번호<span className="require_info">*</span></div>
                        <div className="inputpw input_bottom">
                            <input
                                ref={inputPW}
                                name={"password"}
                                type={"password"}
                                value={state.password}
                                onChange={handleEditPasswordChange}   // 비밀번호 핸들러 실행
                                placeholder="8 ~ 15자 영문, 숫자, 특수문자 조합"
                            />
                            {state.password !== "" ? (
                                state.isValidPassword ? (
                                    <p style={{color: "blue"}}>유효한 비밀번호입니다.</p>
                                ) : (
                                    <p style={{color: "red"}}>비밀번호는 8 ~ 15자 영문, 숫자, 특수문자 조합이어야 합니다.</p>
                                )
                            ) : null}
                        </div>

                        {/* 이름 추가 */}
                        <div className="subinfo">이름<span className="require_info">*</span></div>
                        <div className="signup_name input_bottom">
                            <input
                                ref={inputName}
                                name={"name"}
                                value={state.name}
                                onChange={onChange}
                                placeholder="이름을 입력해주세요."
                            />
                        </div>

                        <div className="subinfo">닉네임<span className="require_info">*</span></div>
                        <div className="signup_nicname input_bottom">
                            <div style={{display:"flex"}}>
                                <input
                                    ref={inputNicname}
                                    name={"nickname"}
                                    value={state.nickname}
                                    onChange={onChange}
                                    placeholder="닉네임을 입력해주세요."
                                />
                                <button id="signup_nicname_btn" type="button" onClick={handleCheckDuplicateNickname}>
                                    중복 확인
                                </button>
                            </div>
                        </div>

                        <div className="subinfo">휴대폰<span className="require_info">*</span></div>
                        <div className="signup_phone input_bottom">
                            <input
                                ref={inputphone}
                                name={"phone"}
                                value={state.phone}
                                onChange={handleEditPhoneChange}
                                placeholder="휴대폰 번호를 입력해주세요."
                            />
                            {state.phone !== "" ? (
                                state.isValidPhone ? (
                                    <p style={{color: "blue"}}>유효한 핸드폰 번호입니다.</p>
                                ) : (
                                    <p style={{color: "red"}}>핸드폰 번호는 010으로 시작해서 총 11자리입니다.</p>
                                )
                            ) : null}
                        </div>

                        <div className="subinfo">이메일<span className="require_info">*</span></div>
                        <div className="inputemail">
                            <input
                                style={{marginLeft:"0"}}
                                ref={inputemail}
                                name={"email"}
                                value={state.email}
                                onChange={handleEditemailChange}  // 이메일 핸들러 실행
                                placeholder="이메일을 입력해주세요."
                            />
                            {state.email !== "" ? (
                                state.isValidEmail ? (
                                    <p style={{color: "blue"}}>사용 가능한 email입니다.</p>
                                ) : (
                                    <p style={{color: "red"}}>유효하지 않은 email입니다.</p>
                                )
                            ) : null}
                        </div>
                    </div>
                    <div className="check_term_of_service">
                        {CheckImg ? <span><img src={checkbox} width="20px" onClick={onCheckImg}/>
                            <p onClick={onTermToggle}>이용약관</p></span>
                            : <span><img src={uncheckbox} width="20px" onClick={onCheckImg}/>
                                <p onClick={onTermToggle}>이용약관
                                    <span id={"term"} style={{color: "red", width:"150px"}}>(필수)</span></p>
                                </span>}

                        {termToggle && <Terms_of_service onClose={() => {
                            setTermToggle(false);
                        }} CheckImg={CheckImg} onCheckImgs={onCheckImgs} />}
                    </div>
                    <div className="signbtn">
                        <button type="submit">다음</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Signup;