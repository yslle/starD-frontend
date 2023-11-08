import React from "react";

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

const CommentList = ({ comments, onEditClick, onRemoveClick, onReplySubmit, userNickname }) => {
console.log("^comments: ",comments);
 // 댓글 목록이 비어있을 때 빈 배열로 대체
  if (!comments) {
    comments = [];
  }
  return (
    <div className="comment_list">
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <strong>{comment.author}</strong>
            <div style={{ float: "right" }}>
              {/* 댓글 작성자와 현재 로그인한 사용자를 비교하여 버튼 표시 여부 결정 */}
              {comment.author === userNickname && (
                <>
                  <span className="comment_edit_btn" onClick={() => onEditClick(comment.id)}>
                    수정
                  </span>
                  <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                  <span className="comment_remove_btn" onClick={() => onRemoveClick(comment.id)}>
                    삭제
                  </span>
                </>
              )}
            </div>
            <p>{comment.content}</p>
            <span>{formatDatetime(comment.createdAt)}</span>
            {comment.createdAt !== comment.updatedAt && ( // createdAt과 updatedAt이 다른 경우에만 표시
              <>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>( 수정: {formatDatetime(comment.updatedAt)} )</span>
              </>
            )}
            {comment.author !== userNickname && (
              <>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <span className="comment_report_btn">신고</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
