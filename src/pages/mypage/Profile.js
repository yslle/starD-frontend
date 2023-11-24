import React, {useEffect, useState} from "react";
import Category from "../../components/repeat_etc/Category";
import Backarrow from "../../components/repeat_etc/Backarrow"
import Header from "../../components/repeat_etc/Header";
import default_profile_img from "../../images/default_profile_img.png";

const Profile = () => {
    const [uploadImgUrl, setUploadImgUrl] = useState(null);

    //프로필 사진 업로드
    const onchangeImageUpload = (e) => {
        console.log("사진", e.target.files);
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setUploadImgUrl(imageUrl);
    }

    //프로필 사진 삭제
    const onchangeImageDelete = (e) => {
        setUploadImgUrl(null);
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
                        {uploadImgUrl ? (
                            <img className="profile-img" src={uploadImgUrl} alt="프로필 없을때"/>
                        ) : (

                            <img className="profile-img" src={default_profile_img} alt="프로필사진"/>
                        )}
                        <input className="image-upload" type="file" accept="image/*" onChange={onchangeImageUpload}/>
                        <button onClick={onchangeImageDelete}> 프로필 사진 삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Profile;
