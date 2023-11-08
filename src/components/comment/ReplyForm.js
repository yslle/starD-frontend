import React, { useState } from 'react';

const ReplyForm = ({ author, onReplySubmit, onCancel }) => {
    const [replyContent, setReplyContent] = useState('');

    const handleReplySubmit = () => {
        if (replyContent.trim() !== '') {
            // 작성한 답글을 부모 컴포넌트로 전달하여 댓글 목록에 추가
            onReplySubmit(replyContent);
            setReplyContent('');
        }
    };

    return (
        <div className="comment_reply_form">
            <span> └ &nbsp;&nbsp;</span><strong>{author}</strong> {/* 작성자의 닉네임 표시 */}
            <br/>
            <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="답글을 입력하세요"
            />
            <button onClick={handleReplySubmit} className="reply_btn">등록</button>
            <button onClick={onCancel} className="reply_btn">취소</button>
        </div>
    );
};

export default ReplyForm;
