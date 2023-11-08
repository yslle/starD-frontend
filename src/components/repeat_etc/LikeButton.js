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
//
// LikeButton.propTypes = {
//     like: PropTypes.bool.isRequired, // 스크랩 상태를 받아와야 함
//     onClick: PropTypes.func.isRequired, // 클릭 시 실행할 함수를 받아와야 함
// };

export default LikeButton;