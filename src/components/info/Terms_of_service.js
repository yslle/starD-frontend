import {service} from "../../css/user_css/service.css";
import checkbox from "../../images/check.png";
import uncheckbox from "../../images/unchecked.png";
import React, {useCallback, useEffect, useState} from "react";

const Terms_of_service=({onClose, CheckImg, onCheckImgs})=>{
    const [AllCheck, setAllCheck]= useState(false);
    const [FirstArticleCheck, setFirstArticleCheck]= useState(false);
    const [SecondArticleCheck, setSecondArticleCheck]= useState(false);

    const HandleCheckAll= ()=>{
        if(AllCheck === false) {
            setAllCheck(!AllCheck);
            setFirstArticleCheck(true);
            setSecondArticleCheck(true);
        }
        else{
            setAllCheck(!AllCheck);
            setFirstArticleCheck(false);
            setSecondArticleCheck(false);
        }
    }

    const HandleArticleCheckFirst= ()=>{

        setFirstArticleCheck(!FirstArticleCheck);
        if(AllCheck===true && FirstArticleCheck===true){
            setAllCheck(!AllCheck);
            console.log("AllCheck",AllCheck);
        }
        if( AllCheck===false && FirstArticleCheck === false && SecondArticleCheck === true){
            setAllCheck(!AllCheck);
        }
    }

    const HandleArticleCheckSecond= ()=>{
        setSecondArticleCheck(!SecondArticleCheck);
        if(AllCheck===true && SecondArticleCheck===true){
            setAllCheck(!AllCheck);
        }
        if(AllCheck === false && FirstArticleCheck===true && SecondArticleCheck === false){
            setAllCheck(!AllCheck);
        }
    }
    useEffect(() => {
        if(CheckImg){
            HandleCheckAll();
        }
    }, []);

    const HandleAgree=()=>{
        if(!FirstArticleCheck){
            alert("STARD 이용약관에 동의해주세요");
            return;
        }else if(!SecondArticleCheck){
            alert("개인정보 수집 및 이용약관에 동의해주세요");
            return;
        }else{
            onCheckImgs();
            onClose();
        }

    }
    return (<div className="background">
        <div className="service_content_wrap">
            <div className="check_terms">
                <div className="check_wrap">
            <label form ="chk_all" id={"all"}>
                <span id={"check_btn"}>
                {AllCheck ? <img src={checkbox} width="20px" onClick={HandleCheckAll}/>
                    : <img src={uncheckbox} width="20px" onClick={HandleCheckAll}/>}
                </span>
                <span className="text check_all">전체 동의하기</span>
            </label>
                </div>
            </div>

    <div className="terms_desc">실명 인증된 아이디로 가입,
        위치기반 서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.</div>
            <ul className="terms_list">
                <li className="terms_item">
                    <div className="check_terms">
                        <div className="check_wrap">
                            <label htmlFor="termsService">
                                <span id={"check_btn"}>
                {FirstArticleCheck ? <img src={checkbox} width="20px" onClick={HandleArticleCheckFirst}/>
                    : <img src={uncheckbox} width="20px" onClick={HandleArticleCheckFirst}/>}
                </span>
                                <em className="option point">[필수]</em>
                                <div className="text_wrap">
                                    <span className="text">STARD 이용약관</span>
                                </div>
                            </label>
                        </div>
                    </div>
            <div className="terms_box">
                <div className="article">
                    <h3 className="article_title">여러분을 환영합니다.</h3>
                    <p className="article_text">
                        STARD 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 STARD 서비스의 이용과
                        관련하여 STARD 서비스를 제공하는 STARD 주식회사(이하 ‘STARD’)와 이를 이용하는 STARD 서비스 회원(이하
                        ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 STARD 서비스 이용에 도움이 될 수 있는 유익한
                        정보를 포함하고 있습니다.
                    </p>
                    <p className="article_text">
                        STARD 서비스를 이용하시거나 STARD 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을
                        확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
                    </p>
                </div>
                <div className="article">
                    <h3 className="article_title">다양한 STARD 서비스를 즐겨보세요.</h3>
                    <p className="article_text">
                        STARD는 <a href="http://www.STARD.com/" target="_blank">www.STARD.com</a>을 비롯한 STARD 도메인의
                        웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공,
                        상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다.<br />
                        여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 네이버 서비스를 자유롭게
                        이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항,
                        <a href="https://help.STARD.com/support/home.nhn" target="_blank">STARD 웹고객센터(이하 ‘고객센터’)</a>
                        도움말 등에서 쉽게 확인하실 수 있습니다.
                    </p>
                    <p className="article_text">
                        STARD는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련
                        법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를
                        구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가
                        있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다.
                    </p>
                    <p className="article_text">
                        STARD 서비스에는 기본적으로 본 약관이 적용됩니다만 네이버가 다양한 서비스를 제공하는 과정에서 부득이 본
                        약관 외 별도의 약관, 운영정책 등을 적용하는 경우가 있습니다. 그리고 STARD
                        계열사가 제공하는 특정 서비스의 경우에도 해당 운영 회사가 정한 고유의 약관, 운영정책
                        등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다.
                    </p>
                </div>
                <div className="article">
                    <h3 className="article_title">회원으로 가입하시면 네이버 서비스를 보다 편리하게 이용할 수 있습니다.</h3>
                    <p className="article_text">
                        여러분은 본 약관을 읽고 동의하신 후 회원 가입을 신청하실 수 있으며, STARD는 이에 대한 승낙을 통해 회원
                        가입 절차를 완료하고 여러분께 네이버 서비스 이용 계정(이하 ‘계정’)을 부여합니다. 계정이란 회원이 네이버
                        서비스에 로그인한 이후 이용하는 각종 서비스 이용 이력을 회원 별로 관리하기 위해 설정한 회원 식별 단위를
                        말합니다. 회원은 자신의 계정을 통해 좀더 다양한 네이버 서비스를 보다 편리하게 이용할 수 있습니다.

                    </p>
                    <p className="article_text">
                        STARD 단체에 속한 여러 구성원들이 공동의 계정으로 STARD 서비스를 함께 이용할 수 있도록 단체회원
                        계정도 부여하고 있습니다. 단체회원 구성원들은 하나의 계정 및 아이디(ID)를 공유하되 각자 개별적으로
                        설정한 비밀번호를 입력하여 계정에 로그인하고 각종 서비스를 이용하게 됩니다. 단체회원은 관리자와 멤버로
                        구성되며, 관리자는 구성원 전부로부터 권한을 위임 받아 단체회원을 대표하고 단체회원 계정을 운용합니다.<br />
                        따라서 관리자는 단체회원 계정을 통해 별도 약관 또는 기존 약관 개정에 대해 동의하거나 단체회원에서 탈퇴할
                        수 있고, 멤버들의 단체회원 계정 로그인 방법 및 이를 통한 게시물 게재 등 네이버 서비스 이용을 관리(게시물
                        삭제 포함)할 수 있습니다. 본 약관에서 규정한 사항은 원칙적으로 구성원 모두에게 적용되며, 각각의 구성원은
                        다른 구성원들의 단체회원 계정 및 아이디(ID)를 통한 서비스 이용에 관해 연대책임을 부담합니다.
                    </p>
                </div>
                <div className="article">
                    <h3 className="article_title">여러분이 제공한 콘텐츠를 소중히 다룰 것입니다.</h3>
                    <p className="article_text">
                        STARD는 여러분이 게재한 게시물이 STARD 서비스를 통해 다른 이용자들에게 전달되어 우리 모두의 삶을 더욱
                        풍요롭게 해줄 것을 기대합니다. 게시물은 여러분이 타인 또는 자신이 보게 할 목적으로 네이버 서비스 상에
                        게재한 부호, 문자, 음성, 음향, 그림, 사진, 동영상, 링크 등으로 구성된 각종 콘텐츠 자체 또는 파일을
                        말합니다.
                    </p>
                    <p className="article_text">
                        STARD는 여러분의 생각과 감정이 표현된 콘텐츠를 소중히 보호할 것을 약속 드립니다. 여러분이 제작하여
                        게재한 게시물에 대한 지식재산권 등의 권리는 당연히 여러분에게 있습니다.
                    </p>
                    <p className="article_text">
                        한편, STARD 서비스를 통해 여러분이 게재한 게시물을 적법하게 제공하려면 해당 콘텐츠에 대한 저장, 복제,
                        수정, 공중 송신, 전시, 배포, 2차적 저작물 작성(단, 번역에 한함) 등의 이용 권한(기한과 지역 제한에 정함이
                        없으며, 별도 대가 지급이 없는 라이선스)이 필요합니다.<br />
                        게시물 게재로 여러분은 네이버에게 그러한 권한을 부여하게 되므로, 여러분은 이에 필요한 권리를 보유하고
                        있어야 합니다.
                    </p>
                    <p className="article_text">
                        STARD는 여러분이 부여해 주신 콘텐츠 이용 권한을 저작권법 등 관련 법령에서 정하는 바에 따라 네이버
                        서비스 내 노출, 서비스 홍보를 위한 활용, 서비스 운영, 개선 및 새로운 서비스 개발을 위한 연구, 웹 접근성
                        등 법률상 의무 준수, 외부 사이트에서의 검색, 수집 및 링크 허용을 위해서만 제한적으로 행사할 것입니다.<br />
                        만약, 그 밖의 목적을 위해 부득이 여러분의 콘텐츠를 이용하고자 할 경우엔 사전에 여러분께 설명을 드리고
                        동의를 받도록 하겠습니다.
                    </p>
                    <p className="article_text">
                        또한 여러분이 제공한 소중한 콘텐츠는 STARD 서비스를 개선하고 새로운 STARD 서비스를 제공하기 위해
                        인공지능 분야 기술 등의 연구 개발 목적으로 STARD 및 STARD 계열사에서 사용될 수 있습니다. STARD의
                        지속적인 연구 개발을 통해 여러분께 좀 더 편리하고 유용한 서비스를 제공해 드릴 수 있도록 최선을
                        다하겠습니다.
                    </p>
                    <p className="article_text">
                        STARD는 여러분이 자신이 제공한 콘텐츠에 대한 STARD 또는 다른 이용자들의 이용 또는 접근을 보다 쉽게
                        관리할 수 있도록 다양한 수단을 제공하기 위해 노력하고 있습니다. 여러분은 STARD 서비스 내에 콘텐츠 삭제,
                        비공개 등의 관리기능이 제공되는 경우 이를 통해 직접 타인의 이용 또는 접근을 통제할 수 있고, 고객센터를
                        통해서도 콘텐츠의 삭제, 비공개, 검색결과 제외 등의 조치를 요청할 수 있습니다.<br />
                        다만, 일부 STARD 서비스의 경우 삭제, 비공개 등의 처리가 어려울 수 있으며, 이러한 내용은 각 서비스 상의
                        안내, 공지사항, 고객센터 도움말 등에서 확인해 주시길 부탁 드립니다.
                    </p>
                </div>
            </div>
                </li>

            <li className="terms_item">
                <div className="check_terms">
                    <div className="check_wrap">
                        <label form="termsPrivacy">
                             <span id={"check_btn"}>
                {SecondArticleCheck ? <img src={checkbox} width="20px" onClick={HandleArticleCheckSecond}/>
                    : <img src={uncheckbox} width="20px" onClick={HandleArticleCheckSecond}/>}
                </span>
                            <em className="option point">[필수]</em>
                            <div className="text_wrap">
                                <span className="text">개인정보 수집 및 이용</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="terms_box">
                    <div className="article">
                        <p className="article_text">
                            개인정보보호법에 따라 STARD에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및
                            이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
                            자세히 읽은 후 동의하여 주시기 바랍니다.
                        </p>
                    </div>
                    <div className="article">
                        <h3 className="article_title">1. 수집하는 개인정보</h3>
                        <p className="article_text">
                            이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등 대부분의 STARD 서비스를 회원과 동일하게 이용할
                            수 있습니다. 이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해
                            회원가입을 할 경우, STARD는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
                        </p>

                    </div>
                    <div className="article">
                        <h3 className="article_title">2. 수집한 개인정보의 이용</h3>
                        <p className="article_text">
                            STARD 및 STARD 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한
                            인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.
                        </p>
                        <ul className="sections">
                            <li className="sections_section">
                                - 회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및 법정대리인의 본인 확인, 이용자
                                식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
                            </li>
                            <li className="sections_section">
                                - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석,
                                개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규
                                서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
                                신규 서비스 요소의 발굴 및 기존 서비스 개선 등에는 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 생성·제공·추천, 상품 쇼핑 등에서의 인공지능(AI) 기술 적용이 포함됩니다.
                            </li>
                            <li className="sections_section">
                                - 법령 및 STARD 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의
                                원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항
                                전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를
                                이용합니다.
                            </li>
                            <li className="sections_section">
                                - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를
                                이용합니다.
                            </li>
                            <li className="sections_section">
                                - <strong>이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.</strong>
                            </li>
                            <li className="sections_section">
                                - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스
                                제공 및 광고 게재 등에 개인정보를 이용합니다.
                            </li>
                            <li className="sections_section">
                                - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해
                                개인정보를 이용합니다.
                            </li>
                        </ul>
                    </div> //article2
                    <div className="article">
                        <h3 className="article_title">3. 개인정보의 보관기간</h3>
                        <div className="clause large">
                            <h4 className="clause_title">
                                회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
                                단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관
                                의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
                            </h4>
                        </div>
                        <div className="clause">
                            <h4 className="clause_title">
                                이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와
                                같습니다.
                            </h4>
                            <ul className="sections">
                                <li className="sections_section">
                                    - 부정 가입 및 이용 방지 <br />부정 이용자의 가입인증 휴대전화번호 또는 DI (만14세 미만의 경우
                                    법정대리인DI) : 탈퇴일로부터 6개월 보관 <br />탈퇴한 이용자의 휴대전화번호(복호화가 불가능한 일방향
                                    암호화(해시처리)) : 탈퇴일로부터 6개월 보관
                                </li>
                                <li className="sections_section">
                                    - QR코드 복구 요청 대응 <br />QR코드 등록 정보:삭제 시점으로부터6개월 보관
                                </li>
                                <li className="sections_section">
                                    - 스마트플레이스 분쟁 조정 및 고객문의 대응 <br />휴대전화번호:등록/수정/삭제 요청 시로부터 최대1년
                                </li>
                                <li className="sections_section">
                                    - STARD 플러스 멤버십 서비스 혜택 중복 제공 방지 <br />암호화처리(해시처리)한DI :혜택 제공
                                    종료일로부터6개월 보관
                                </li>
                                <li className="sections_section">
                                    - STARD 엑스퍼트 재가입 신청 및 부정 이용 방지 <br />STARD 엑스퍼트 서비스 및 네이버 엑스퍼트 센터 가입 등록정보&판매자 이름 :
                                    신청일로부터 6개월(등록 거절 시, 거절 의사 표시한 날로부터 30일) 보관
                                </li>
                                <li className="sections_section">
                                    - 전자서명 인증 업무 <br />
                                    개인정보: STARD 인증서 서비스 해지 시까지 보관<br />
                                    인증서와 인증 업무에 관한 기록: 인증서 효력 상실일로부터 5년 보관
                                </li>
                            </ul>
                        </div>
                        <div className="clause">
                            <h4 className="clause_title">
                                전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및 전자거래 기본법, 통신비밀보호법 등 법령에서
                                일정기간 정보의 보관을 규정하는 경우는 아래와 같습니다. 네이버는 이 기간 동안 법령의 규정에 따라
                                개인정보를 보관하며, 본 정보를 다른 목적으로는 절대 이용하지 않습니다.
                            </h4>
                            <ul className="sections">
                                <li className="sections_section">
                                    - 전자상거래 등에서 소비자 보호에 관한 법률 <br />계약 또는 청약철회 등에 관한 기록: 5년 보관
                                    <br />대금결제 및 재화 등의 공급에 관한 기록: 5년 보관 <br />소비자의 불만 또는 분쟁처리에 관한
                                    기록: 3년 보관
                                </li>
                                <li className="sections_section">
                                    - 전자문서 및 전자거래 기본법 <br />공인전자주소를 통한 전자문서 유통에 관한 기록 : 10년 보관
                                </li>
                                <li className="sections_section">- 통신비밀보호법 <br />로그인 기록: 3개월<br /><br /></li>
                            </ul>
                            <p className="clause_text">
                                참고로 STARD는 ‘개인정보 유효기간제’에 따라 1년간 서비스를 이용하지 않은 회원의 개인정보를 별도로
                                분리 보관하여 관리하고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </li>
            </ul>
            <div className="ok_term">
                <button type="button" id="agreebtn" onClick={onClose}>뒤로가기</button>
                <button type="button" id="agreebtn" onClick={HandleAgree}>동의하기</button>
            </div>
        </div>
    </div>
    )
};

export default Terms_of_service;