import React, {useState} from "react";

const TeamPostEdit = ({post, onUpdatePost, onCancel}) => {
    const [updatedPost, setUpdatedPost] = useState(post);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUpdatedPost((prevData) => ({
            ...prevData,
            file: file,
        }));
    };

    const handleUpdateClick = () => {
        onUpdatePost(updatedPost);
    }

    return (
        <form className="new_post_form">
            <div>
                <span>제목</span>
                <input type="text" name="title" value={updatedPost.title} onChange={handleInputChange}/>
            </div>
            <div style={{display:"flex"}}>
                <span style={{paddingLeft: "10px",marginTop:"5px"}}>상세 내용</span>
                <textarea name="content" value={updatedPost.content} onChange={handleInputChange}/>
            </div>
            <div style={{display:"flex"}}>
                <span style={{ paddingLeft: "10px", marginTop: "5px" }}>파일 등록</span>
                <input type="file" name="file" onChange={handleFileChange}/>
            </div>
            <div className="btn">
                <button onClick={handleUpdateClick} className="register_btn">저장</button>
                <button onClick={onCancel} className="register_btn">취소</button>
            </div>
        </form>
    );
}
export default TeamPostEdit;