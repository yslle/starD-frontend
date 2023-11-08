import React, { useState } from "react";
import arrowdown from "../../images/arrowdown.png";
import arrowup from "../../images/arrowup.png";
//class >> footer_info == min width 650px
//650px 보다 작을 때는 푸터를 토글 형식으로 할 예정



const Footer = () => {
	const [toggle, setToggle] = useState(false);
	const [arrow, setarrow] = useState(`${arrowdown}`);

	const [toggle2, setToggle2] = useState(false);
	const [arrow2, setarrow2] = useState(`${arrowdown}`);

	const [toggle3, setToggle3] = useState(false);
	const [arrow3, setarrow3] = useState(`${arrowdown}`);

	const handlertoggle = () => {
		if (toggle) {
			setarrow(`${arrowdown}`);
			setToggle((toggle) => !toggle);
		} else {
			setarrow(`${arrowup}`);
			setToggle((toggle) => !toggle);
		}
	};
	const handlertoggle2 = () => {
		if (toggle2) {
			setarrow2(`${arrowdown}`);
			setToggle2((toggle2) => !toggle2);
		} else {
			setarrow2(`${arrowup}`);
			setToggle2((toggle2) => !toggle2);
		}
	};
	const handlertoggle3 = () => {
		if (toggle3) {
			setarrow3(`${arrowdown}`);
			setToggle3((toggle3) => !toggle3);
		} else {
			setarrow3(`${arrowup}`);
			setToggle3((toggle3) => !toggle3);
		}
	};
	return (
		<div>
			<footer>
				<div className="footer_info">
					<div className={"info_wrap"}>
						<div className={"info_content"}>
					<ul className="info_ul">
						<div className="item">
							<p className="project_name">STAR D</p>
							<li className="introduce_progject">
								<span>STAR D 소개</span>
								<span>스터디 리스트 보기</span>
							</li>
						</div>
						<div className="item">
							<p className="customers_service">고객센터</p>
							<li className="service">
								<span>공지사항</span>
								<span>자주묻는 질문</span>
								<span>문의하기</span>
							</li>
						</div>
						<div className="item">
							<p className="front">프론트</p>
							<li className="dev_info">
								<span>김현수</span>
								<span>허민영</span>
							</li>
						</div>
						<div className="item">
							<p className="back">백엔드</p>
							<li className="dev_info">
								<span>강지륜</span>
								<span>이승연</span>
								<span>차은수</span>
							</li>
						</div>
						<div className="item">
							<p className="infra">인프라</p>
							<li className="dev_info">
								<span>강지륜</span>
								<span>허민영</span>
							</li>
						</div>
					</ul>
						</div>
					<hr />
					<div className="subfooter_info">
						<div className={"info_second_wrap"}>
						<div className={"info_second_content"}>
						<ul>
							<div className="item_first">
								<li>STAR D</li>
							</div>{" "}
							|{" "}
							<div className="item1">
								<li>개인정보처리방침</li>{" "}
							</div>
							|{" "}
							<div className="item1">
								<li>이용약관</li>
							</div>
						</ul>
						<div className="info_etc">
							(주)동덕 We B | 대표자: Gwang Lee | 사업자 번호 :
							000-0000-0000
							<br /> 개인정보보호책임자: WeB(위비) | 이메일:
							hf23@gmail.com | 주소: 서울특별시 성북구 화랑로13길
							60
						</div>
					</div>
					</div>
					</div>
				</div>
				</div>
				<div className={"smallwidth_footer_info_wrap"}>
				<div className="smallwidth_footer_info">

					<p id="1" onClick={handlertoggle}>
						STAR D <img src={arrow} width="15px" />
					</p>
					{toggle == true && (
						<ul>
							<li>STAR D 소개</li>
							<li>스터디 리스트 다시보기</li>
						</ul>
					)}
					<hr />
					<p id="2" onClick={handlertoggle2}>
						고객센터 <img src={arrow2} width="15px" />
					</p>
					{toggle2 == true && (
						<ul>
							<li>공지사항</li>
							<li>자주묻는 질문</li>
							<li>문의하기</li>
						</ul>
					)}
					<hr />
				</div>
				<div className={"smallwidth_sub_wrap"}>
				<div className="smallwidth_sub">
					<span>개인정보처리방침 이용약관</span>
					<p id="3" onClick={handlertoggle3}>
						(주)동덕 We B 사업자 정보{" "}
						<img src={arrow3} width="15px" />
					</p>
					{toggle3 == true && (
						<ul>
							<li>
								대표자: Gwang Lee | 사업자 번호 : 000-0000-0000
							</li>
							<li>
								개인정보보호책임자: WeB(위비) | 이메일:
								hf23@gmail.com{" "}
							</li>
							<li>주소: 서울특별시 성북구 화랑로13길 60</li>
						</ul>
					)}
					<span></span>
				</div>
				</div>
				</div>
			</footer>

		</div>

	);
};

export default Footer;
