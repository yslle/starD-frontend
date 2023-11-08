import {useCallback, useState} from "react";

const CommentForm = ({addComment}) => {
    const [value, setValue] = useState("");
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.trim() === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        addComment(value);
        setValue("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="댓글을 입력해주세요." className="comment_input" value={value} onChange={onChange}/>
            <input type="submit" value="등록" className="comment_submit_btn"/>
        </form>
    )
}
export default CommentForm;