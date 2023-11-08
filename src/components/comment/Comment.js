import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentEdit from "./CommentEdit";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Comment = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [userNickname, setUserNickname] = useState("");
  const location = useLocation();
  const targetId = location.state || ""; // StudyListItem.js 파일에서 스터디 id 값을 get

  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 상태 추가

  // study/qna/comm 타입을 저장할 상태 변수
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true); // 초기에 로딩 중 상태로 설정

  // TODO 컴포넌트가 마운트될 때 댓글 목록을 가져옴
  useEffect(() => {
    fetchComments()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("댓글 목록을 불러오는 중 에러 발생:", error);
          setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정합니다.
        });
    }, [targetId, type, accessToken]);

  // TODO accessToken으로 닉네임 알아오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/member/find-nickname", {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // 서버에서 회원 객체를 받아와 닉네임 저장
        const member = response.data;
        setUserNickname(member.nickname);
      })
      .catch((error) => {
        console.error("서버에서 닉네임을 가져오는 중 에러 발생:", error);
      });
  }, [accessToken]);

  console.log("게시글 아이디: ", targetId);
  console.log("가져온 닉네임: ", userNickname);

  // TODO 게시글 id로 타입 알아오기 (POST/STUDY)
  useEffect(() => {
    if (targetId) {
      axios
        .get(`http://localhost:8080/replies/type/${targetId}`, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then((response) => {
          const type = response.data;
          setType(type);
          console.log("게시글 타입: ", type);
        })
        .catch((error) => {
          console.error("스터디 타입을 가져오는 중 에러 발생:", error);
        });
    }
  }, [targetId, accessToken]);


  // TODO 댓글 목록 조회
  const fetchComments = () => {
    // targetId가 없다면 댓글 목록을 가져올 수 없음
    if (targetId === "") {
      setLoading(false); // 로딩 상태 해제
      return Promise.resolve(); // 빈 Promise를 반환
    }

    // 게시글 타입에 따라 요청 URL을 설정합니다.
    let url;
    if (type === "QNA" || type === 'COMM') {
      url = `http://localhost:8080/replies/post/${targetId}`;
    } else if (type === "STUDY") {
      url = `http://localhost:8080/replies/study/${targetId}`;
    }

    return axios
      .get(url, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // 서버에서 받은 댓글 목록을 상태에 저장
        const commentsWithIds = response.data.map((comment) => ({
          ...comment,
          id: comment.id, // 서버에서 받은 댓글 객체에 아이디를 저장
          author: comment.member.nickname, // 작성자의 닉네임 저장
        }));
        setComments(commentsWithIds);
      })
      .catch((error) => {
        console.error("댓글 목록을 불러오는 중 에러 발생:", error);
        throw error; // 오류를 다시 던져서 .catch() 블록으로 전달
      });
  };

  // TODO 댓글 DB에 저장
  const addComment = (newComment) => {
    // 게시글 타입에 따라 요청 URL을 설정합니다.
    let url;
    if (type === "QNA" || type === 'COMM') {
      url = "http://localhost:8080/replies/post";
    } else if (type === "STUDY") {
      url = "http://localhost:8080/replies/study";
    }

    axios
      .post(url, {
        targetId: targetId,
        replyContent: newComment, // 댓글 내용 추가
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        alert("댓글이 등록되었습니다.");

        // 서버로부터 받은 응답에서 새로 등록된 댓글 정보를 가져옵니다.
        const newCommentData = response.data;
        // 댓글 목록을 업데이트합니다.
        setComments((prevComments) => [...prevComments, newCommentData]);
        fetchComments();
      })
      .catch((error) => {
        console.error("댓글 추가 중 에러 발생:", error);
      });
  };

  // 수정 버튼 클릭
  const handleEditClick = (commentId) => {
    setEditingComment(commentId); // 댓글 ID만 설정
    console.log("수정버튼 클릭: ", commentId);
  };

  // TODO 댓글 수정 (수정 후 저장 버튼 클릭)
  const handleCommentSave = (commentId, updatedContent) => {
    axios
      .post(`http://localhost:8080/replies/${commentId}`, {
        replyContent: updatedContent, // 수정한 댓글 내용 추가
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        alert("댓글이 수정되었습니다.");

        // 서버로부터 수정된 댓글 정보를 가져옵니다.
        const updatedCommentData = response.data;

        // 댓글 목록을 업데이트합니다.
        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? updatedCommentData : comment // 전체 수정된 댓글 정보로 업데이트합니다.
        );
        setEditingComment(null);
        setComments(updatedComments);
        fetchComments();
      })
      .catch((error) => {
        console.error("댓글 수정 중 에러 발생:", error);
      });
  };

  // TODO 댓글 삭제
  const handleRemoveClick = (commentId) => {
    const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");

    if (confirmDelete) {
        axios
          .delete(`http://localhost:8080/replies/${commentId}`, {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then(() => {
            alert("댓글이 삭제되었습니다.");

            // 삭제된 댓글을 제외하고 업데이트된 댓글 목록을 가져옵니다.
            const updatedComments = comments.filter((comment) => comment.id !== commentId);
            setComments(updatedComments);
          })
          .catch((error) => {
            console.error("댓글 삭제 중 에러 발생:", error);
          });
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }
  return (
    <div className="comment_form">
      <div>
        <h2>댓글</h2>
        <CommentForm addComment={addComment} />
        <CommentList
          comments={comments}
          onEditClick={handleEditClick}
          onRemoveClick={handleRemoveClick}
          userNickname={userNickname}
        />
      </div>
      {editingComment && (
        <CommentEdit
          comment={comments}
          commentId={editingComment} // 수정
          onCancel={() => setEditingComment(null)}
          onSave={handleCommentSave}
        />
      )}
    </div>
  );
};

export default Comment;
