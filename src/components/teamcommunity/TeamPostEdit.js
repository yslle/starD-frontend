import React, { useEffect, useState } from "react";

const TeamPostEdit = ({ post, onUpdatePost, onCancel }) => {
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => {
        // 게시물 속성이 변경될 때 컴포넌트를 업데이트
        setUpdatedPost(post);
    }, [post]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // 새 파일이 선택된 경우에만 업데이트
        if (selectedFile) {
            setUpdatedPost((prevData) => ({
                ...prevData,
                file: selectedFile,
                fileName: selectedFile.name,
                fileChanged: true,
            }));
        }
    };

    const handleUpdateClick = () => {
        onUpdatePost(updatedPost);
    };

    return (
        <form className="new_post_form" style={{ marginRight: "200px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ paddingLeft: "10px" }}>제목</span>
                <input
                    type="text"
                    name="title"
                    value={updatedPost.title}
                    onChange={handleInputChange}
                />
            </div>
            <div style={{ display: "flex" }}>
                <span style={{ paddingLeft: "10px", marginTop: "5px" }}>상세 내용</span>
                <textarea
                    name="content"
                    value={updatedPost.content}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom:"15px"}}>
                    <span style={{ paddingLeft: "10px", marginTop: "5px" }}>파일 등록</span>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                    />
                </div>
                {updatedPost.fileName && (
                    <span style={{ paddingLeft: "95px", width:"auto" }}>{updatedPost.fileName}</span>
                )}
            </div>
            <div className="btn">
                <button onClick={handleUpdateClick} className="register_btn">
                    저장
                </button>
                <button onClick={onCancel} className="register_btn">
                    취소
                </button>
            </div>
        </form>
    );
};

export default TeamPostEdit;
