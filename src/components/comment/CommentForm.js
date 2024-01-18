import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";

const CommentForm = ({addComment}) => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedInUserId = localStorage.getItem('isLoggedInUserId');
    const [value, setValue] = useState("");
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[]);
    const handleSubmit = (e) => {
        if (accessToken && isLoggedInUserId) {
            e.preventDefault();
            if (value.trim() === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }
            addComment(value);
            setValue("");
        } else {
            alert("로그인 해주세요");
            navigate("/login");
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="댓글을 입력해주세요." className="comment_input" value={value} onChange={onChange}/>
            <input type="submit" value="등록" className="comment_submit_btn"/>
        </form>
    )
}
export default CommentForm;