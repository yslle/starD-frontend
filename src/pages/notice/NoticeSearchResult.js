import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";

import "../../css/community_css/Community.css";
import NoticeSearchBar from "../../components/notice/NoticeSearchBar";
import NoticeInsert from "../../components/notice/NoticeInsert";
import NoticeListItem from "../../components/notice/NoticeListItem";
import axios from "axios";

const Notice = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");
    const selectOption = new URLSearchParams(location.search).get("select");

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [showPostInsert, setShowPostInsert] = useState(false);
    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const handleMoveToStudyInsert = (e) => {
         if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            setShowPostInsert(!showPostInsert);
         } else {
             alert("로그인 해주세요");
             navigate("/login");
         }
    };

    useEffect(() => {
        let base_url = "http://localhost:8080/notice/search";
        let params = {
            searchType: selectOption,
            searchWord: searchQuery
        };
        axios.get(base_url, { params })
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, [searchQuery, selectOption]);

    return (
        <div className={"main_wrap"} id={"community"}>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <h1>NOTICE LIST</h1>
                {showPostInsert && (
                    <NoticeInsert />
                )}
                {!showPostInsert && (
                    <div>
                        <div className="community_header">
                            <NoticeSearchBar/>
                            <button onClick={handleMoveToStudyInsert} className="new_post_btn">
                                새 글 작성
                            </button>
                        </div>
                        <div className="community">
                            <div>
                                {posts.length === 0 && <h3>검색 결과가 없습니다.</h3>}
                                {posts.length > 0 && (
                                    <table className="post_table" key={posts.id}>
                                        <th>제목</th>
                                        <th>닉네임</th>
                                        <th>날짜</th>
                                        <th>조회수</th>
                                        <th>공감수</th>
                                        {posts.map((d, index) => (
                                            <NoticeListItem setPosts={setPosts} posts={d} d={d}
                                                          index={index} key={d.id}/>
                                        ))}
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    );
}
export default Notice;