import Header from "../../components/repeat_etc/Header";
import React, {useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Find from "../../css/user_css/Find.css"
import {isEmail, isPassword, isPhone} from "../../util/check.js";
import axios from "axios";

const FindedID = () => {
    const location = useLocation();
    const members = location.state.findId;
    return (
        <div>
            <Header showSideCenter={false}/>
            <div className={"page_title"}>
                    <p id={"find-id"}>아이디 찾기</p>
                </div>
                <div className="findresult">
                <p id={"result-id"}>당신의 아이디는 {members.map((member, index) => (<span key={index}>{member.id}, </span>))}입니다.</p>
                </div>
            <div className={"gotologin"}>
                <Link to={"/login"}><button id={"go-to-login"}>로그인하러가기</button> </Link>
            </div>


        </div>
    )
};
export default FindedID;