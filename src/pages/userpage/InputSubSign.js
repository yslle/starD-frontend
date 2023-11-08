import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../../components/repeat_etc/Header";
import RealEstate from "../../components/info/RealEstate";
import InputEstates from "../../css/user_css/InputEstates.css";
import axios from "axios";

const InputSubSign =()=>{
    // 이전 페이지에서 넘어온 아이디 읽어오기
    const memberId = localStorage.getItem("memberId");
    console.log("넘어온 회원 아이디: ", memberId);

    //거주지와 관심분야 선택한 사람 관리
    //mem을 props으로 넘기면서 상태를 관리하고 이를 서버에 넘긴다.
    const navigate = useNavigate();

    const [mem, setMem] = useState(
        {city:"",district:"", interests: []});

    useEffect(() => {
        console.log("member상태", mem);
    }, []);

    // 건너뛰기 버튼
    const onClickSkipBtn=()=>{
        navigate("/");
    }

    // 저장하기 버튼
    const onClickSaveBtn = () => {
      axios.post("http://localhost:8080/signup/option-data", {
        id: memberId,
        city: mem.city,
        district: mem.district,
        interestList: tags.join(","),
      })
        .then(response => {
          console.log(response.data);
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        })
        .catch(error => {
          console.error("Error sending data to the backend:", error);
        });
    };

    const tagoptions = [
        { value: "웹 개발", name: "웹 개발" },
        { value: "앱 개발", name: "앱 개발" },
        { value: "머신러닝", name: "머신러닝" },
        { value: "데이터 분석", name: "데이터 분석" },
        { value: "게임 개발", name: "게임 개발" },
        { value: "블록체인", name: "블록체인" },
        { value: "네트워크 보안", name: "네트워크 보안" },
        { value: "클라우드 컴퓨팅", name: "클라우드 컴퓨팅" },
        { value: "인공지능", name: "인공지능" },
        { value: "사이버 보안", name: "사이버 보안" },
        { value: "소프트웨어 테스트", name: "소프트웨어 테스트" },
        { value: "로봇공학", name: "로봇공학" },
        { value: "사물인터넷 (IoT)", name: "사물인터넷 (IoT)" },
        { value: "데이터베이스 관리", name: "데이터베이스 관리" },
        { value: "UI/UX 디자인", name: "UI/UX 디자인" },
        { value: "프로젝트 관리", name: "프로젝트 관리" },
        { value: "빅데이터", name: "빅데이터" },
        { value: "컴퓨터 그래픽스", name: "컴퓨터 그래픽스" },
        { value: "자동화", name: "자동화" },
        { value: "블로그 운영", name: "블로그 운영" },
        ];

        const [tags, setTags] = useState(()=>{
               const storedTags=localStorage.getItem('tags');
               return storedTags ? storedTags.split(",") : [];
        });

        const Tagoption = (props) => {
            const handletagChange = (value) => {
                if (tags.includes(value)) {
                    setTags(tags.filter((tag) => tag !== value));
                } else {
                    if (tags.length < 3) { //최대 3개까지만 선택 가능하게
                        setTags([...tags, value]);

                    }
                    else{
                        alert("관심분야는 최대 3개까지 입니다.");
                    }
                }
            };

    console.log(tags)

    return (
      <div className="tags">
        {props.editoptions.map((editoption) => (
           <button
             id="tag"
             name="TAG"
             onClick={() => handletagChange(editoption.value)}
             value={editoption.value}
             style={{
               backgroundColor: tags.includes(editoption.value)
                  ? "lightpink"
                  : tags.length === 3
                  ? "#dbdbdb"
                  : "white",
               }}
             value={editoption.value}
           >
           {editoption.value}
           </button>
        ))}
      </div>
      );
    };

    return (
        <div>
            <Header showSideCenter={false}/>
            <div className="wrap">
            <div className="content">
                <div className="login_info">
                    <p>회원가입 <span style={{color:"red"}}>(STEP 2)</span></p>
                </div>
                <div className="subcontent">
                    <div className="change_estates" id="estates">
                        <div id="title">거주지</div>
                        <div id="checkestate">
                          <RealEstate mem = {mem}/>
                        </div>
                    </div>
                    <div id="checkestates">
                        <div>
                              <div id="title">
                                관심분야<span id="sub_title" style={{fontSize:"15px"}}>(최대 3개까지 선택 가능)</span>
                              </div>
                              <Tagoption editoptions={tagoptions} value="" />
                        </div>
                    </div>
                    <div className="next_btn">
                        <button id="next" onClick={onClickSkipBtn}>건너뛰기</button>
                        <button id="next" onClick={onClickSaveBtn}>가입하기</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export  default InputSubSign;