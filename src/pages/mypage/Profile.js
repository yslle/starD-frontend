import React from "react";
import Category from "../../components/repeat_etc/Category";
import Backarrow from "../../components/repeat_etc/Backarrow"
import Header from "../../components/repeat_etc/Header";

const Profile=()=>{

    return(
        <div>
            <Header showSideCenter={true}/>
            <div className="container">
                <Category/>
                <div className="main_container">
                    <p id={"entry-path"}> 홈 > 마이페이지 > 프로필 </p>
                    <Backarrow subname={"프로필"}/>
                    <div className="sub_container">
                    </div>
                </div>
            </div>
        </div>
    )
}
export default  Profile;
