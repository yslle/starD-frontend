import Header from "../../components/repeat_etc/Header";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";

import "../../css/community_css/Community.css";
import SearchBar from "../../components/community/CommSearchBar";
import PostInsert from "../../components/community/PostInsert";
import PostListItem from "../../components/community/PostListItem";
import axios from "axios";

const Community = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");
    const selectOption = new URLSearchParams(location.search).get("select");
    const categoryOption = new URLSearchParams(location.search).get("category");

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
        let base_url = "";
        let params = {};
        if (categoryOption === "전체") {
            base_url = "http://localhost:8080/com/search";
            params = {
                searchType: selectOption,
                searchWord: searchQuery
            };
        }
        else {
            base_url = "http://localhost:8080/com/search/category";
            params = {
                searchType: selectOption,
                category: categoryOption,
                searchWord: searchQuery
            };
        }

        axios.get(base_url, { params })
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
            });
    }, []);

    return (
        <div className={"main_wrap"} id={"community"}>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <h1>COMMUNITY LIST</h1>
                {showPostInsert && (
                    <PostInsert />
                )}
                {!showPostInsert && (
                    <div>
                        <div className="community_header">
                            <SearchBar/>
                            <button onClick={handleMoveToStudyInsert} className="new_post_btn">
                                새 글 작성
                            </button>
                        </div>
                        <div className="community">
                            <div>
                                {posts.length === 0 && <h3>검색 결과가 없습니다.</h3>}
                                {posts.length > 0 && (
                                    <table className="post_table" key={posts.id}>
                                        <th>카테고리</th>
                                        <th>제목</th>
                                        <th>닉네임</th>
                                        <th>날짜</th>
                                        <th>조회수</th>
                                        <th>공감수</th>
                                        <th>스크랩수</th>
                                        {posts.map((d, index) => (
                                            <PostListItem setPosts={setPosts} posts={d} d={d}
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
export default Community;