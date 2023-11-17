import {Link} from "react-router-dom";
import React from "react";
import "../../css/notice_css/Notice.css";

const QnaListItem = ({posts, setPosts}) => {
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
        <tr className={`post_list ${posts.type === "FAQ" ? "faq_row" : ""}`}>
            <td className="community_category">{posts.type}</td>
            <Link to={`/qnadetail/${posts.id}`}
                  style={{
                      textDecoration: "none",
                      color: "inherit",
                  }}>
                <td className="community_title">{posts.title}</td>
            </Link>
            {posts.type === "FAQ" ? (
                <td className="community_nickname">관리자</td>
            ) : (
                <td className="community_nickname">{posts.member.nickname}</td>
            )}
            <td className="community_datetime">{formatDatetime(posts.createdAt)}</td>
            <td>{posts.viewCount}</td>
            <td>{posts.starCount}</td>
        </tr>
    )
}
export default QnaListItem;