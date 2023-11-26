import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Category from "../../components/repeat_etc/Category";
import Backarrow from "../../components/repeat_etc/Backarrow"
import Header from "../../components/repeat_etc/Header";
import default_profile_img from "../../images/default_profile_img.png";


const Profile = () => {
    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [uploadImgUrl, setUploadImgUrl] = useState(null);
    const [selfintro, setSelfIntro] = useState("");
    const [toggle, setToggle] = useState(false);
    const [profile, setProfile] =useState(null);
    const [testimg, setTestImg]=useState('');

    //프로필 조회하기
    useEffect(() => {
        axios
            .get("http://localhost:8080/user/mypage/profile", {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                console.error("프로필 가져오기 성공:", res.data);
                setProfile(res.data);
                console.log("이미지:",res.data.imgUrl );
                var str = res.data.imgUrl.substr(14);
                var str_result = str.substr(1);
                const fullImageUrl = `D:\\stard\\${str_result}`;
                console.log("fullImageUrl:", fullImageUrl);
                setUploadImgUrl(fullImageUrl);
                setUploadImgUrl(res.data.imgUrl);


            })
            .catch((error) => {
                console.error("프로필 가져오기 실패:", error);
            });
    }, []);

    //프로필 사진 삭제
    const onchangeImageDelete = (e) => {
        setUploadImgUrl(null);
        return;
    }

    const onchangeselfIntroduce=(e)=>{
        setSelfIntro(e.target.value);
    }

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="container">
                <Category/>
                <div className="main_container">
                    <p id={"entry-path"}> 홈 > 마이페이지 > 프로필 </p>
                    <Backarrow subname={"프로필"}/>
                    <div className="sub_container">
                        <div className={"profile_content"}>
                            {profile?.imgUrl ? (
                                <img className="profile-img" src={uploadImgUrl} alt="프로필 없을때"/>
                            ) : (

                                <img className="profile-img" src={default_profile_img} alt="프로필사진"/>
                            )}
                        </div>
                        <div className={"One-line-self-introduction"}>
                            <p id={"self-intro-p"}>한줄 자기소개</p>
                            <div>
                                {profile?.introduce === null ? (
                                    <>
                                        <p>자기소개란이 비었어요! 한줄소개를 해주세요!</p>
                                    </>
                                ) : (
                                    <p>{profile?.introduce}</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className={"save_profile_content"}>
                        <Link
                            to={"/mypage/profile/Editprofile"}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        > <button className={"save-profile"}>수정하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Profile;
