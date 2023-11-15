import Header from "../../components/repeat_etc/Header";
import Backarrow from "../../components/repeat_etc/Backarrow";
import {Link, useParams, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import LikeButton from "../../components/repeat_etc/LikeButton";
import ScrapButton from "../../components/repeat_etc/ScrapButton";
import axios from "axios";
import NoticeEdit from "../../components/notice/NoticeEdit";

const NoticeDetail = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    console.log("postId : ", id);

    const [postItem, setPostItem] = useState(null);

    const [likeStates, setLikeStates] = useState(false);
    const [initiallyLikeStates, setInitiallyLikeStates] = useState(false);

    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [postDetail, setPostDetail] = useState([]);

    let accessToken = localStorage.getItem('accessToken');
    let isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [url, setUrl] = useState(null);
    const [initiallyUrlStates, setInitiallyUrlStates] = useState(false);
    const [type, setType] = useState(null);

    const [isWriter, setIsWriter] = useState(false);

    useEffect(() => {
        if (accessToken && isLoggedInUserId) {
            // 타입 조회
            axios.get(`http://localhost:8080/notice/find-type/${id}`, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    setType(res.data.type);

                    if (res.data.type === "NOTICE") {
                        setUrl(`http://localhost:8080/notice/${id}`);
                    }
                    else if (res.data.type === "FAQ") {
                        setUrl(`http://localhost:8080/faq/${id}`);
                    }

                    setInitiallyUrlStates(true);
                    console.log("$$$ ", url);
                })
                .catch((error) => {
                    console.error("id로 타입 조회 실패:", error);
                });

        }
    }, [id]);

    useEffect(() => {
        if (accessToken && isLoggedInUserId && initiallyUrlStates) {
            console.log("TYPE: ", type);
            axios.get(`http://localhost:8080/star/notice/${id}`, {
                params: { type : type },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    setLikeStates(response.data);
                    setInitiallyLikeStates(true);
                })
                .catch(error => {
                    console.log("공감 불러오기 실패", error);
                });

        } else {
            setInitiallyLikeStates(false);
        }
    }, [id ,initiallyUrlStates]);

    useEffect(() => {
        const config = {
            headers: {}
        };

        if (accessToken && isLoggedInUserId) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (initiallyLikeStates) {
            console.log("^^^url ", url);
            axios.get(url, config)
                .then((res) => {
                    setPostItem(res.data);
                    if (res.data.member.id === isLoggedInUserId) { // 자신의 글인지
                        setIsWriter(true);
                    }
                })
                .catch((error) => {
                    console.error("게시글 세부 데이터 가져오기 실패:", error);
                });
        }
    }, [id, accessToken, isLoggedInUserId, initiallyLikeStates]);

    const toggleLike = () => {
        if (!(accessToken && isLoggedInUserId)) {
            alert("로그인 해주세요");
            navigate("/login");
        }

        if (likeStates) { // true -> 활성화되어 있는 상태 -> 취소해야 함
            axios.delete(`http://localhost:8080/star/notice/${id}`, {
                params: { type : type },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("공감 취소 성공 " + response.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("공감 취소 실패");
                });

            setLikeStates(false);
        } else {
            axios.post(`http://localhost:8080/star/notice/${id}`, null, {
                params: { type : type },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("공감 성공");
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("공감 실패");
                });

            setLikeStates(true);
        }
    };

    const handleEditClick = () => {
        setEditing(true);
    }

    const handleCancelEdit = () => {
        setEditing(false);
    }

    const handlePostUpdate = (updatedPost) => {
        setEditing(false);

        console.log("수정 예정 : " + updatedPost.id + ", " + updatedPost.title + ", " + updatedPost.content
            + ", " + updatedPost.category);

        const config = {
            headers: {}
        };

        if (accessToken && isLoggedInUserId) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        axios.post(url, {
            title: updatedPost.title,
            content: updatedPost.content,
            category: updatedPost.category
        }, {
            params: { id: updatedPost.id },
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log("공지글 수정 성공");
                alert("게시글이 수정되었습니다.");

                setPostDetail(response.data);
                const updatedPosts = posts.map(post =>
                    post.id === updatedPost.id ? updatedPost : post
                );
                setPosts(updatedPosts);
            })
            .catch(error => {
                console.error("Error:", error);
                console.log("공지글 수정 실패");
                alert("수정에 실패했습니다.");
            });

    }

    const handlePostDelete = () => {
        const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
        if (confirmDelete) {

            axios.delete(url, {
                params: { id: id },
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    console.log("공지글 삭제 성공 ");
                    alert("게시글이 삭제되었습니다.");
                    const updatedPosts = posts.filter(post => post.id !== postDetail[0].id);
                    setPosts(updatedPosts);
                    navigate("/notice");
                })
                .catch(error => {
                    console.error("Error:", error);
                    console.log("공지글 삭제 실패");

                    alert("삭제에 실패했습니다.");
                });
        }
    }

    const formatDatetime = (datetime) => {
        const date = new Date(datetime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDatetime;
    };

    return (
        <div>
            <Header showSideCenter={true}/>
            <div className="community_container">
                <Backarrow subname={"NOTICE LIST"}/>
                {editing ? (
                    <NoticeEdit
                        post={postItem}
                        onUpdatePost={handlePostUpdate}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <div className="community_detail">
                        {postItem && (
                            <div className="post_header">
                                <div className="post_category">
                                    <span>카테고리 > </span>
                                    <span>{postItem.category}</span>
                                </div>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div className="post_title">
                                        {postItem.title}
                                    </div>
                                    {isWriter && (
                                        <div className="button">
                                            <button style={{marginRight:"5px"}} onClick={handleEditClick}>수정</button>
                                            <button onClick={handlePostDelete}>삭제</button>
                                        </div>
                                    )}
                                </div>
                                <div className="post_info">
                                    <div className="left">
                                        <span className="post_nickname">관리자</span>
                                        <span className="post_created_date">{formatDatetime(postItem.createdAt)}</span>
                                    </div>
                                    <div className="right">
                                    <span className="like_btn"><LikeButton like={likeStates}
                                                                           onClick={() => toggleLike()} /></span>
                                        <span>조회 <span>{postItem.viewCount}</span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {postItem && (
                            <div className="post_content" dangerouslySetInnerHTML={{ __html: postItem.content.replace(/\n/g, '<br>') }} />
                        )}

                        <div className="btn">
                            <Link to={"/notice"}
                                  style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                  }}
                            >
                                <button className="community_list_btn">글 목록보기</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NoticeDetail;