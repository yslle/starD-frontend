import React from "react";
import PropTypes from "prop-types";
import HeartFill from "../../images/heart-fill.png";
import HeartEmpty from "../../images/heart-empty.png";

const LikeButton = ({ like, onClick }) => {
    return (
        <img
            src={like ? HeartFill : HeartEmpty}
            className="like_img"
            alt="Like Button"
            onClick={onClick} // 클릭 시 onClick 함수 실행
        />
    );
};
export default LikeButton;