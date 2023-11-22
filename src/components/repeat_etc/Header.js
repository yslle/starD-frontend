import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import LOGO from "../../images/Logo.png"

const Header =  ({showSideCenter}) => {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [page, setPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);

    const Side = () => {
        useEffect(() => {

            const logout = (member) => {
                axios.post("http://localhost:8080/api/v2/members/logout", {
                    accessToken: accessToken,
                    memberId: member
                }, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params: {
                        accessToken: accessToken,
                        memberId: member
                    }
                })
                    .then(() => {
                        console.log("로그아웃 성공");
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('isLoggedInUserId');
                        setIsLoggedIn(false);
                        alert("30분이 지나 자동 로그아웃");
                        navigate("/");
                    })
                    .catch(error => {
                        console.log("로그아웃 실패", error);
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('isLoggedInUserId');
                        setIsLoggedIn(false);
                        navigate("/");
                    });
            };


            if (accessToken != null && isLoggedInUserId != null) {
                axios.get("http://localhost:8080/api/v2/members/accessToken-expiration", {    // accessToken 만료 여부 확인 function
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    params: {
                        accessToken: accessToken
                    }
                })
                    .then((res) => {
                        console.log("accessToken 확인 여부 결과 값 : " + res.data);

                        if (res.data === false)
                            setIsLoggedIn(true);
                        else {
                            console.log("토큰 만료")
                            logout(isLoggedInUserId);
                            setIsLoggedIn(false);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('isLoggedInUserId');
                setIsLoggedIn(false);
            }
        }, []);

        // TODO 권한 조회
        useEffect(() => {
            if (accessToken != null && isLoggedInUserId != null) {
                axios
                    .get("http://localhost:8080/member/auth", {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    .then((res) => {
                        const auth = res.data[0].authority;
                        console.log("*auth :", auth);

                        if (auth === "ROLE_USER") {
                            setIsAdmin(false);
                        } else if (auth === "ROLE_ADMIN") {
                            setIsAdmin(true);
                        }
                    })
                    .catch((error) => {
                        console.error("권한 조회 실패:", error);
                        setIsAdmin(false);
                    });
            }
        }, [accessToken]);

        return (
            <div className="headerbar">
                <nav>
                    <ul>
                        {isLoggedIn ? (
                            <React.Fragment>
                                <li>
                                    <Link
                                        to={"/mypage"}
                                        style={{textDecoration: "none", color: "inherit"}}
                                    >
                                        마이페이지
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/logout"}
                                        style={{textDecoration: "none", color: "inherit"}}>
                                        로그아웃
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li>
                                    <Link
                                        to={"/login"}
                                        style={{textDecoration: "none", color: "inherit"}}
                                    >
                                        로그인
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={"/subinfo/signup"}
                                        style={{textDecoration: "none", color: "inherit"}}
                                    >
                                        회원가입
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        );
    };

    const sideleft = () => {
        return (
            <div className="headerbar" title={"홈으로 가기"}>
                <nav>
                    <ul>
                        <li>
                            <Link
                                to={"/"}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <div className={"Header_logo"}>
                                    STAR D

                                    <div className={"Header_logo_img"}>
                                        <img src={LOGO} width={"60px"}/></div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };
    const sidecenter = () => {
        return (
            <div className="sidebar">
                <nav>
                    <ul>
                        <Link to={{
                            pathname: `/study/page=${page}`,
                            state: {
                                page: page,
                            }
                        }}
                              style={{textDecoration: "none", color: "inherit"}}>
                            <li>스터디</li>
                        </Link>
                        <Link
                            to={"/community"}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                            <li>커뮤니티</li>
                        </Link>
                        <Link
                            to={"/notice"}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                        <li>공지사항</li>
                        </Link>
                        <Link
                            to={"/qna"}
                            style={{textDecoration: "none", color: "inherit"}}
                        >
                        <li>QNA</li>
                        </Link>
                        <Link
                            to={"/admin"}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                display: isAdmin ? "block" : "none"
                            }}
                        >
                            <li>관리자 페이지</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        );
    };

    return (
        <div>
            <div className={"header_wrap"}>
                <header>
                    <div className="head_left">{sideleft()}</div>
                    {showSideCenter ? <div className="head_text">{sidecenter()}</div> :
                        <div className="head_text">{""}</div>
                    }
                    <div className="head_right">{Side()}</div>
                </header>
            </div>
        </div>
    );
};
export default React.memo(Header);
