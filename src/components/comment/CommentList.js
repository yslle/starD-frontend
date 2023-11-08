import React, {useState} from "react";
import Report from "../report/Report.js";

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
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCommentId, setReportCommentId] = useState(null);


  const handleOpenReportModal = (commentId) => {
    setReportCommentId(commentId);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setReportCommentId(null);
    setShowReportModal(false);
  };


  const handleReportSubmit = (reportReason) => {
    console.log("신고 사유:", reportReason);
  };

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
            {comment.createdAt !== comment.updatedAt && (
              <>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>( 수정: {formatDatetime(comment.updatedAt)} )</span>
              </>
            )}
            {comment.author !== userNickname && (
              <>
                <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
                <span className="comment_report_btn"
                      onClick={() => handleOpenReportModal(comment.id)}>신고</span>
              </>
            )}
          </li>
        ))}
      </ul>
      <Report
          show={showReportModal}
          handleClose={handleCloseReportModal}
          onReportSubmit={handleReportSubmit}
          targetId={reportCommentId}
      />
    </div>
  );
};

export default CommentList;
