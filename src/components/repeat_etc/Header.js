import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LOGO from "../../images/Logo.png"

const Header = ({ showSideCenter }) => {
	//헤더 잡아놓기
	// const { isLoggedIn } = useAuth(); // useAuth를 이용하여 로그인 상태를 가져옴
	// 로그인 여부 확인 변수
	let [isLoggedIn, setIsLoggedIn] = useState(false);

	// localStorage에 저장된 accessToken 추출
	let accessToken = localStorage.getItem('accessToken');

	// localStorage에 저장된 로그인한 사용자 Id 추출
	let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');


	const Side = () => {

		// console.log(accessToken, isLoggedInUserId);
		// accessToken과 로그인한 사용자 id 추출
		// localStorage.removeItem('accessToken');
		// localStorage.removeItem('isLoggedInUserId');

		useEffect(() => {

			const logout = (member) => {    // 로그아웃 function
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

						// 로그아웃 성공 시 localStorage에 저장된 accessToken, isLoggedInUserId 제거
						localStorage.removeItem('accessToken');
						localStorage.removeItem('isLoggedInUserId');

						// 로그아웃 상태로 설정
						setIsLoggedIn(false);
					})
					.catch(error => {
						console.log("로그아웃 실패", error);
					});
			};


			if (accessToken != null && isLoggedInUserId != null) {
				// 로그인 한 상태이거나 accessToken이 만료된 상태
				console.log("test");
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
						console.log("결과 값 : " + res.data);

						if (res.data === false)
							// accessToken이 만료되지 않는 상태
							setIsLoggedIn(true);
						else {
							// accessToken이 만료된 상태 -> 로그아웃 및 로그아웃 상태로 변환
							logout(isLoggedInUserId);
							setIsLoggedIn(false);
						}
					})
					.catch(error => {
						console.log(error);
					});
			} else {    // accessToken이 존재하지 않다면 로그인 안 한 상태
				console.log("test2");
				setIsLoggedIn(false);
			}
		}, []);

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
						<Link
							to={"/study"}
							style={{textDecoration: "none", color: "inherit"}}
						>
							<li>스터디</li>
						</Link>
						{/* 임시로 팀블로그 연결 */}
						<Link
							to={"/teamblog"}
							style={{textDecoration: "none", color: "inherit"}}
						>
							<li>커뮤니티</li>
						</Link>
						<li>공지사항</li>
					</ul>
				</nav>
			</div>
		);
	};

	// const nosidecenter = () => { //가운데 부분 없는 header
	// 	return <Header headText={""} leftChild={sideleft()} rightChild={Side()}/>;
	// };
	// const rendsidecenter = () => { //기본 render header
	// 	return (
	// 		<Header
	// 			headText={sidecenter()}
	// 			leftChild={sideleft()}
	// 			rightChild={Side()}
	// 		/>
	// 	);
	// };

	return (
		<div>
		<div className={"header_wrap"}>
		<header>
			<div className="head_left">{sideleft()}</div>
			{showSideCenter ? <div className="head_text">{sidecenter()}</div>:
				<div className="head_text">{""}</div>
			}
			<div className="head_right">{Side()}</div>
		</header>
		</div>
			{/*<hr id={"header-end"}/>*/}
		</div>
	);
};
export default Header;
